import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { postRecipe, getTypes } from "../Actions";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import "./Estilos/Create.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

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
      !input.image &&
      !input.image.includes("https://") &&
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
      <div className="nav-create">
        <Link className="create-title2" to="/home">
          <p className="button-create2">HOME</p>
        </Link>
        <h1 className="page-title">CREAR RECETA</h1>
      </div>

      <form className="form-order" onSubmit={(e) => handleSubmit(e)}>
        <div className="form">
          <input
            type="text"
            value={input.title}
            name="title"
            required
            onChange={(e) => handleChange(e)}
          />
          <label className="lbl-nombre">
            <span className="text-nomb">TITULO</span>{" "}
          </label>
        </div>
        {errors.title && <p className="error">{errors.title}</p>}

        <div className="form">
          <input
            type="text"
            value={input.summary}
            name="summary"
            required
            onChange={(e) => handleChange(e)}
          />
          <label className="lbl-nombre">
            <span className="text-nomb">RESUMEN</span>{" "}
          </label>
          {errors.summary && <p className="error">{errors.summary}</p>}
        </div>

        <div className="form">
          <input
            type="text"
            value={input.healthScore}
            name="healthScore"
            required
            onChange={(e) => handleChange(e)}
          />
          <label className="lbl-nombre">
            <span className="text-nomb">NIVEL SALUDABLE</span>{" "}
          </label>{" "}
          {errors.healthScore && <p className="error">{errors.healthScore}</p>}
        </div>

        <div className="form">
          <input
            type="text"
            value={input.analyzedInstructions}
            name="analyzedInstructions"
            required
            onChange={(e) => handleChange(e)}
          />
          <label className="lbl-nombre">
            <span className="text-nomb">INSTRUCCIONES</span>{" "}
          </label>
        </div>

        <div className="form">
          <input
            type="text"
            value={input.image}
            name="image"
            required
            onChange={(e) => handleChange(e)}
          />
          <label className="lbl-nombre">
            <span className="text-nomb">IMAGEN</span>{" "}
          </label>
          {errors.image && <p className="error">{errors.image}</p>}
        </div>

        <div className="form">
          <select className="diets-form" onChange={(e) => handleSelect(e)}>
            <option value="">Tipo de Dieta</option>
            {diets.map((d) => {
              return (
                <option value={d.name} key={d.id}>
                  {d.name}
                </option>
              );
            })}
          </select>

          {errors.typeDiets && <p className="error">{errors.typeDiets}</p>}
        </div>
        <div className="typesContainer">
          <ul className="list">
            <li>
              {input.typeDiets.map((dt) => (
                <div key={dt}>
                  <h5 key={dt}>
                    {diets?.find((d) => d.name === dt)?.name}
                    <button className="delete" onClick={() => handleDelete(dt)}>
                      <AiOutlineCloseCircle />{" "}
                    </button>
                  </h5>
                </div>
              ))}
            </li>
          </ul>
        </div>

        <div className="btn-container">
          <button
            className="btn-bottom"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            CREAR RECETA
          </button>
        </div>
      </form>
    </div>
  );
}
