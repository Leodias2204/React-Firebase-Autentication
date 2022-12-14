import React, { useState } from 'react'
import { useAuth } from "../context/authContext"
import { useNavigate, Link} from "react-router-dom"

export const Signup = () => {
    const { signUp } = useAuth();
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState("false")

    async function handleSubmit(element) {
        element.preventDefault();

        setLoading(true)

        if (email.length === 0) {
            alert("Digite seu email")
            setLoading(false)
            return
        }
        if (password.length < 6) {
            alert("Password deve ter no mínimo 6 caracteres")
            setLoading(false)
            return;
        }
        if (password !== confirmPassword) {
            alert("As senhas não conferem")
            setLoading(false)
            setConfirmPassword("")
            setPassword("")
            return
        }
        try {
            await signUp(email, password)
            alert("Usuário Criado com sucesso!")
            navigate("/login")

        } catch (error) {
            alert("Ocorreu um erro ao tentar criar o usuário ")
        }

        setLoading(false)
    }

    return (
        <div className="container">
            <h2>Cadastro de Usuário</h2>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" value={email}
                    onChange={(element) => setEmail(element.target.value)}
                />

                <label>Senha </label>
                <input type="password" value={password}
                    onChange={(element) => setPassword(element.target.value)}
                />

                <label>Confirmação de Senha</label>
                <input type="password" value={confirmPassword}
                    onChange={(element) => setConfirmPassword(element.target.value)}
                />

                <button disable={loading} className='button-block' type="submit">Cadastrar
                </button>
            </form>

            <div className="center">
                <div>
                    <p>
                        Já possui uma conta <Link to="../login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}