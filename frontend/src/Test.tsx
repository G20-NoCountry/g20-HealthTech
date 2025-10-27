import { useEffect } from "react";
import { api } from "./api";



export const Test = () => {

    //$ Medico
    // api.auth.login({
    //   email: "alfonzo.320@google.com",
    //   password: "password123",
    // });

    //$ Paciente
    // api.auth.login({
    //   email: "maria_diaz.28@google.com",
    //   password: "password123",
    // });

    //$ Logout
    // api.auth.logout();

    const getData = async () => {
        const fetch = await api.medicalRecords.getByPatentId(1);
    };

    useEffect(() => {
        getData();
    }, [])

    return <div>Test Component</div>;

}