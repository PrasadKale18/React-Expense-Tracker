import React from "react"
function Header(props) {

    return (
        <header>
            <h1>Expense Tracker</h1>
            <div className="total-income">{props.totalIncome}</div>

        </header>
    )
}

export default Header