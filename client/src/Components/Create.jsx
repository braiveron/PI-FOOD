import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { postRecipe, getTypes } from "../Actions";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: "",
    summary: "",
    healthScore: "",
    analyzedInstructions: "",
    image: "",
    typeDiets: [],
  });

  function validate(input) {
    let errors = {};
    if (!input.title) {
      errors.title = "Debes ingresar un titulo";
    } else if (!input.summary) {
      errors.summary = "Debes ingresar un resumen";
    } else if (
      !input.healthScore ||
      input.healthScore < 0 ||
      input.healthScore > 100 ||
      typeof input.healthScore !== "number"
    ) {
      errors.healthScore = "Debes ingresar un numero entre 0 y 100";
    } else if (
      !input.image.includes("https://") ||
      !input.image.includes("http://")
    ) {
      errors.image = "Debes ingresar una URL válida";
    } else if (!input.typeDiets) {
      errors.typeDiets = "Selecciona al menos un tipo de dieta";
    }
    return errors;
  }

  function handleChange(e) {
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      typeDiets: [...input.typeDiets, e.target.value],
    });
  }

  function handleDelete(type) {
    setInput({
      ...input,
      typeDiets: input.typeDiets.filter((d) => d !== type),
    });
  }

  function handleSubmit(e) {
    if (!input.title) {
      e.preventDefault();
      return alert("Es necesario ingresar un titulo para crear tu receta");
    } else if (!input.typeDiets.length) {
      e.preventDefault();
      return alert("Selecciona al menos un tipo de dieta");
    } else if (!input.image) {
      e.preventDefault();
      return alert("Inserta una URL de imagen valida");
    }
    dispatch(postRecipe(input));
    alert("Receta creada con exito!");
    setInput({
      title: "",
      healthScore: 0,
      image: "",
      typeDiets: [],
    });
    navigate("/home");
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>VOLVER</button>
      </Link>
      <h1>CREAR RECETA</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>TITLE:</label>
          <input
            type="text"
            value={input.title}
            name="title"
            placeholder="Ingrese titulo de su receta"
            onChange={(e) => handleChange(e)}
          />
          {errors.title && <p className="error">{errors.title}</p>}

          <label>SUMMARY:</label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            placeholder="Ingrese un resumen"
            onChange={(e) => handleChange(e)}
          />
          {errors.summary && <p className="error">{errors.summary}</p>}

          <label>HEALTHSCORE:</label>
          <input
            type="text"
            value={input.healthScore}
            name="healthScore"
            placeholder="Indica un numero"
            onChange={(e) => handleChange(e)}
          />
          {errors.healthScore && <p className="error">{errors.healthScore}</p>}

          <label>INSTRUCCIONES:</label>
          <input
            type="text"
            value={input.analyzedInstructions}
            name="analyzedInstructions"
            onChange={(e) => handleChange(e)}
          />

          <label>IMAGE:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            placeholder="Ingrese URL de imagen"
            onChange={(e) => handleChange(e)}
          />
          {errors.image && <p className="error">{errors.image}</p>}

          <select onChange={(e) => handleSelect(e)}>
            <option value="">Tipo de Dieta</option>
            {diets.map((d) => {
              return (
                <option value={d.name} key={d.id}>
                  {d.name}
                </option>
              );
            })}
          </select>
          <ul>
            <li>
              {input.typeDiets.map((dt) => (
                <div key={dt}>
                  <h5 key={dt}>
                    {diets?.find((d) => d.name === dt)?.name}
                    <button onClick={() => handleDelete(dt)}>X</button>
                  </h5>
                </div>
              ))}
            </li>
          </ul>
          {errors.typeDiets && <p className="error">{errors.typeDiets}</p>}
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            CREAR RECETA
          </button>
        </div>
      </form>
    </div>
  );
}
