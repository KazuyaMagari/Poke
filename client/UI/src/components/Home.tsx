import Button from 'react-bootstrap/Button';
import Footer from './Footer';
function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* メインコンテンツ */}
      <div className="container" style={{ width: '80%' }}>
        <div className="row">
          <div className="col-sm-12 d-flex justify-content-center align-items-center m-0 p-0">
            <h1 className="text-center mb-4">ポケモンクイズアプリへようこそ！</h1>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-12 d-flex justify-content-center align-items-center flex-column p-0 m-0">
            <p className="text-center w-100" style={{ fontSize: '1.5rem', width: '60%', lineHeight: '4rem' }}>
              「ポケモン、昔は遊んでたけど今はぜんぜん知らない…」そんなあなたのためのクイズアプリ！
              <br />
              子どもの頃の思い出をよみがえらせながら、新しいポケモンの知識もゲットしよう！
              <br />
              さあ、あなたはどれだけ覚えてる？クイズに挑戦して、ポケモンマスターへの道を進もう！
            </p>
          </div>

          <div className="row mt-3 mb-3">
            <div className="col-sm-6 d-flex justify-content-center align-items-center flex-column p-0 m-0">
              <img src="../pokemons/victinis.webp" alt="victinis" style={{ width: '250px', height: "250px" }} />
            </div>
            <div className="col-sm-6 d-flex justify-content-center align-items-center flex-column p-0 m-0">
              <img src="../pokemons/victinis.webp" alt="victinis" style={{ width: '250px', height: "250px" }} />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-sm-12 d-flex justify-content-center align-items-center flex-column p-0 m-0">
              <Button variant="danger" href="/quiz" style={{ fontSize: '1.5rem'}}>Go Quiz!</Button>
            </div>
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default Home;
