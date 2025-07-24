"use client"

const BankCard = ({ account, index, isActive, onClick, style }) => {
  const maskAccountNumber = (number) => {
    if (!number || number.length < 8) {
      return "•••• •••• •••• ••••";
    }
    return number.slice(0, 4) + " •••• •••• " + number.slice(-4);
  };

  return (
    <div
      className={`bank-card ${isActive ? "active" : ""}`}
      style={{
        ...style,
        background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
        zIndex: 100 - index,
      }}
      onClick={onClick}
    >
      <div className="card-header">
        <div className="chip"></div>
        <div className="card-type">DEBIT</div>
      </div>

      <div className="card-number">{maskAccountNumber(account.accountNumber)}</div>

      <div className="card-footer">
        <div className="card-info">
          <div className="card-label">CARD HOLDER</div>
          <div className="card-value">{account.accountHolderName.toUpperCase()}</div>
        </div>
        <div className="card-info">
          <div className="card-label">VALID THRU</div>
          <div className="card-value">12/28</div>
        </div>
        <div className="bank-logo">
          {account.bankName
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default BankCard;