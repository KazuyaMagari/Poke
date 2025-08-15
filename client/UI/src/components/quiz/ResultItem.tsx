import { SolvedItem } from './useQuiz';

interface Props {
  item: SolvedItem;
  onAddToList: (id: number) => void;
}

export default function ResultItem({ item, onAddToList }: Props) {
  return (
    <div className="container">
      <div className="row mb-3 d-flex align-items-center justify-content-center">
        <div className="col-md-2 d-flex justify-content-center me-0">
          <img src={item.url} alt={item.name} style={{ width: '200px', height: '200px' }} />
        </div>
        <div className="col-md-2 text-center">
          <p>{item.name}</p>
          <br />
          {item.isCorrect ? (
            <p className="text-success">正解！</p>
          ) : (
            <>
              <p className="text-danger">不正解！</p>
              <button className="btn btn-primary" onClick={() => onAddToList(item.id-1)}>
                リストに追加
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
