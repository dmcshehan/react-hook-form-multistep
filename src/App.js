import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { addEmail } from "./reducer";

function App() {
  const [result, setResult] = useState(JSON.stringify({}));
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();

  const email = useSelector((state) => state.email);

  const onSubmit = (data) => {
    setResult(JSON.stringify(data));
    // dispatch(addEmail(data.email));
  };

  const house_type = watch("house_type");
  const numOfFloors = watch("numOfFloors");
  const floorNumber = watch("floorNumber");
  const lift_available = watch("lift_available");

  const disableSubmit = function () {
    if (house_type) {
      if (house_type === "Una casa indipendente") {
        if (numOfFloors) {
          return false;
        }
      }
      if (house_type === "Situato in un condominio") {
        if (floorNumber && lift_available) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="radio"
          id="indipendant_house"
          name="house_type"
          value="Una casa indipendente"
          ref={register({ required: true })}
        />
        <label htmlFor="indipendant_house">Una casa indipendente</label>
        {house_type === "Una casa indipendente" && (
          <p>
            La casa è composta da{" "}
            <input
              type="number"
              name="numOfFloors"
              ref={register({ required: true })}
            />{" "}
            piani.
          </p>
        )}
        <br />
        <input
          type="radio"
          id="condominio"
          name="house_type"
          value="Situato in un condominio"
          ref={register({ required: true })}
        />
        <label htmlFor="condominio">Situato in un condominio</label>

        {house_type === "Situato in un condominio" && (
          <p>
            Si trova al{" "}
            <input type="number" name="floorNumber" ref={register} /> piano{" "}
            <select name="lift_available" ref={register} defaultValue="">
              <option value="" disabled>
                con/senza
              </option>
              <option value="con">con</option>
              <option value="senza">senza</option>
            </select>
            ascensore.
          </p>
        )}
        <br />
        <input type="submit" disabled={disableSubmit()} />
      </form>
      <pre
        style={{
          backgroundColor: "black",
          color: "white",
        }}>
        {result}
      </pre>
    </div>
  );
}

export default App;
