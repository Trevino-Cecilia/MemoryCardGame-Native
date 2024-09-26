function GameCard({ card, onClick, flipped }) {
  return (
    <div className="flip-card" onClick={onClick}>
      <div className="flip-card-inner">
        {flipped && (
          <div className="flip-card-front">
            <img
              src={card.img}
              className="card-img"
              alt={card.name}
              style={{ width: "100px", height: "100px", borderRadius: "20%" }}
            />
          </div>
        )}
        <div className="flip-card-back" />
      </div>
    </div>
  );
}

export default GameCard;
