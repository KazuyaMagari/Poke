import express from "express";
import cors from "cors";
import quizRouter from "../router/quizRouter.js"; 
import listRouter from "../router/listRouter.js";
const app = express();
const PORT = process.env.PORT || 3000;

// 許可するオリジンのリスト
const allowedOrigins = [
  process.env.VITE_API_FRONT_URL,  // 環境変数で設定されたオリジン
  "http://localhost:5173",         // ローカル開発用
  "https://poke-v456.vercel.app"   // 本番環境のフロントエンドURL（必要に応じて追加）
];

// CORS 設定
const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like server-to-server or curl)
    if (!origin) return callback(null, true);

    // allow explicit allowed origins
    if (allowedOrigins.includes(origin)) return callback(null, true);

    // allow vercel subdomains (helps with preview URLs and redirects)
    try {
      const host = new URL(origin).hostname;
      if (host.endsWith('.vercel.app')) return callback(null, true);
    } catch (e) {
      // fallthrough to deny
    }

    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

// Middleware 設定
app.use(cors(corsOptions));
// explicit preflight handler
app.options('*', cors(corsOptions));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ルーティング
app.use("/quiz", quizRouter);
app.use("/list", listRouter);
app.get("/", (req, res) => {
  res.json({ message: "Hello World, this is 2000" });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
