
function History({value}) {
    const first = value[value.length - 1];
    var temp = value.slice(0, value.length - 1);
    const data = temp.map((d) => 
        <p>{d}</p>
    )
  return (
    <div className="history">
        <p id="first">{first}</p>
        {data.reverse()}
    </div>
  ) 
}

export default History