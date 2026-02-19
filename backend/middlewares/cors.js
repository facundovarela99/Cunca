import cors from 'cors'

export const corsMiddleware = () => cors({
    origin: (origin, callback) => {
        const ORIGINS = [
            'http://127.0.0.1:5500',
            'http://127.0.0.1:1234',
            'http://127.0.0.1:8080',
            'http://localhost:1234',
            'http://localhost:8080',
            'http://localhost:8000',
            'http://localhost:5500',
            'http://localhost:5000',
            'http://localhost:3000',
            'http://localhost:80'
        ]

        if (ORIGINS.includes(origin)) {
            return callback(null, true)
        }

        if (!origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))

    }
})