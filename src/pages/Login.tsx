import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from '../styles/Login.module.css'
import {loginRequest} from "../services/auth.ts";
import {toast} from "react-toastify";
import {useAuth} from "../context/AuthContext.tsx";

type LoginFormInputs = {
    username: string;
    password: string;
};

const LoginPage = () => {
    const navigate = useNavigate();
    const {login} = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>();

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const res = await loginRequest(data);
            if (!res.token?.token) throw new Error('Token missing from response');
            login(res.token.token, res.refreshToken);
            console.log('Login response:', res);
            toast.success('Добро пожаловать!');
            navigate('/');
        } catch (err) {
            toast.error('Invalid UserName or Password');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.login_block}>
                <p className='text-xl text-center font-bold'>Login</p>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div>
                        <input
                            className={styles.input}
                            placeholder="Username"
                            {...register('username', { required: 'Username is required' })}
                        />
                        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                    </div>

                    <div>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="Password"
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>

                    <button className={styles.button} type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
