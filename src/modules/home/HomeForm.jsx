import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaMoneyBillWave,
  FaCity,
  FaMapMarkerAlt,
  FaAlignLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { notifications } from "@/components/ui/Toast/ToastNotifications";
import { CREATE_TRANSACTION_MUTATION } from "@/gql/mutations";
import { useMutation, useQuery } from "@apollo/client";
// import { useAuth } from "../auth/context/AuthContext";
import { useMe } from "../auth/hooks/useMe";
import { GET_ME, GET_TRANSACTIONS } from '@/gql/queries';

const validationSchema = Yup.object({
  type: Yup.string().required("Selecciona un type"),
  amount: Yup.number()
    .typeError("Debe ser un número")
    .positive("Debe ser un número positivo")
    .required("Campo obligatorio"),
  city: Yup.string().required("Ingresa la ciudad"),
  location: Yup.string().required("Ingresa el lugar"),
  description: Yup.string()
    .min(5, "Mínimo 5 caracteres")
    .required("Agrega una descripción"),
});

const HomeForm = () => {

  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION_MUTATION, {
    refetchQueries: [
      { query: GET_TRANSACTIONS },
      { query: GET_ME }
    ],
    awaitRefetchQueries: true,
  })
  
  const me = useMe();

  // const tokenVerify = localStorage.getItem('access_token')

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {

      const transactionTypeMap = {
        'ingreso': 'INCOME',
        'egreso': 'EXPENSE'
      };
      
      const transactionData = {
        description: values.description,
        amount: parseFloat(values.amount),
        city: values.city,
        location: values.location,
        transactionType: transactionTypeMap[values.type.toLowerCase()],        
        userId: me?.id, // Asegúrate de que 'me' tenga la estructura correcta
      }

      const { data } = await createTransaction({
        variables: transactionData,
      })

      console.log(data);

      if (data?.createTransaction?.transaction?.id){
        notifications.transactionAdded(`$${values.amount.toLocaleString()}`)
      resetForm();
      } else {
        notifications.transactionError("Error al registrar el movimiento");
      }
    } catch (error) {
      console.error("Error al registrar movimiento:", error);
      notifications.transactionError("Error al registrar el movimiento");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-10 px-4">
      <div className="w-full max-w-lg shadow-2xl rounded-3xl bg-white p-8 border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center tracking-tight">
          Registrar Movimiento
        </h2>

        <Formik
          initialValues={{
            type: "",
            amount: "",
            description: "",
            city: "",
            location: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, resetForm }) => (
            <Form>
              {/* type */}
              <div className="mb-6">
                <label
                  htmlFor="type"
                  className="block text-base font-semibold text-blue-700 mb-1"
                >
                  Tipo <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaMoneyBillWave className="absolute left-3 top-3 text-blue-600 text-base" />
                  <Field
                    as="select"
                    id="type"
                    name="type"
                    aria-required="true"
                    aria-describedby="typeError"
                    className="pl-10 pr-3 py-3 w-full text-base text-blue-700 bg-blue-50 border-2 rounded-xl border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">Selecciona tipo</option>
                    <option value="ingreso">Ingreso</option>
                    <option value="egreso">Egreso</option>
                  </Field>
                </div>
                <ErrorMessage
                  name="type"
                  component="div"
                  id="typeError"
                  className="text-red-600 text-xs mt-1"
                />
              </div>

              {/* Dinero/Cantidad */}
              <div className="mb-6">
                <label
                  htmlFor="amount"
                  className="block text-base font-semibold text-blue-700 mb-1"
                >
                  Dinero/Cantidad <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaMoneyBillWave className="absolute left-3 top-3 text-blue-600 text-base" />
                  <Field
                    type="number"
                    id="amount"
                    name="amount"
                    aria-required="true"
                    aria-describedby="amountError"
                    placeholder="Ej. 50000"
                    className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-blue-300 text-base bg-blue-50 text-blue-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition shadow-sm"
                  />
                </div>
                <ErrorMessage
                  name="amount"
                  component="div"
                  id="amountError"
                  className="text-red-600 text-xs mt-1"
                />
              </div>

              {/* Ciudad y Lugar */}
              <div className="flex flex-col md:flex-row gap-5 mb-6">
                <div className="flex-1">
                  <label
                    htmlFor="city"
                    className="block text-base font-semibold text-blue-700 mb-1"
                  >
                    Ciudad <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaCity className="absolute left-3 top-3 text-blue-600 text-base" />
                    <Field
                      type="text"
                      id="city"
                      name="city"
                      aria-required="true"
                      aria-describedby="cityError"
                      placeholder="Ej. Armenia"
                      className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-blue-300 text-base bg-blue-50 text-blue-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition shadow-sm"
                    />
                  </div>
                  <ErrorMessage
                    name="city"
                    component="div"
                    id="cityError"
                    className="text-red-600 text-xs mt-1"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="location"
                    className="block text-base font-semibold text-blue-700 mb-1"
                  >
                    Lugar <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-blue-600 text-base" />
                    <Field
                      type="text"
                      id="location"
                      name="location"
                      aria-required="true"
                      aria-describedby="locationError"
                      placeholder="Ej. Unicentro"
                      className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-blue-300 text-base bg-blue-50 text-blue-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition shadow-sm"
                    />
                  </div>
                  <ErrorMessage
                    name="location"
                    component="div"
                    id="locationError"
                    className="text-red-600 text-xs mt-1"
                  />
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-base font-semibold text-blue-700 mb-1"
                >
                  Descripción <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaAlignLeft className="absolute left-3 top-4 text-blue-600 text-base" />
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows="4"
                    aria-required="true"
                    aria-describedby="descriptionError"
                    placeholder="Descripción de la acción, Ej. Mercancía, Pago cliente, Domicilio, etc."
                    className="pl-10 pr-3 py-3 w-full text-base text-blue-700 bg-blue-50 rounded-xl border-2 border-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition shadow-sm"
                  />
                </div>
                <ErrorMessage
                  name="description"
                  component="div"
                  id="descriptionError"
                  className="text-red-600 text-xs mt-1"
                />
              </div>

              {/* Botones */}
              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 rounded-2xl shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar'}
                  <FaCheckCircle />
                </button>

                <button
                  type="button"
                  onClick={() => resetForm()}
                  className="w-full bg-gray-200 text-blue-700 font-semibold py-3 rounded-2xl shadow hover:bg-gray-300 transition text-base"
                >
                  Limpiar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default HomeForm;