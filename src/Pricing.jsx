import { useCallback, useState } from "react"

function Pricing() {

    
    const [state, setState] = useState({
        price: 1.15,
        quantity: 100,
        monthDiscount: 0.2,
        volume: 100,
        period: 1,
        pricePerMonth: 0,
        saved: 0,
        total: 0
    });

    const handleChange = useCallback((e) => {
        e.preventDefault();
        setState(prev => ({
            ...prev,
            [e.target.id]: Number(e.target.value)
        }));
    }, [])

    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        let total = 0;

        for (let index = 0; index < state.period; index++) {
            let price = (state.volume / state.quantity) * state.price;
            if (index > 0) {
                price -= price * state.monthDiscount
            }
            total += price
        }

        setState((prev) => ({
            ...prev,
            pricePerMonth: parseFloat(total / prev.period).toFixed(2),
            saved: ((((prev.volume / prev.quantity) * prev.price) * prev.period) - total).toFixed(2),
            total: (total).toFixed(2)
        }))

    }, [state])

    return (
        <main>
            <h1>Price calculator</h1>
            <form onSubmit={handleSubmit}>

                <div className="form-grid">
                    <h3>Pricing</h3>
                    <div className="form-group inline">
                        <label htmlFor="price">Price</label>
                        <input type="number" onChange={handleChange} id="price" className="form-control" value={state.price} />
                    </div>
                    <div className="form-group inline">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" onChange={handleChange} id="quantity" className="form-control" value={state.quantity} />
                    </div>
                    <br />
                    
                    <div className="form-group inline">
                        <label htmlFor="monthDiscount">Month discount (%)</label>
                        <input type="number" onChange={handleChange} id="monthDiscount" className="form-control" value={state.monthDiscount} />
                    </div>
                </div>

                <hr />

                <div className="form-grid">
                <h3>Customer choises</h3>
                    <div className="form-group inline">
                        <label htmlFor="volume">Volume</label>
                        <input type="number" onChange={handleChange} id="volume" className="form-control" value={state.volume} />
                    </div>
                    <div className="form-group inline">
                        <label htmlFor="period">Period (per month)</label>
                        <input type="number" onChange={handleChange} id="period" className="form-control" value={state.period} />
                    </div>
                </div>

                <hr />
                
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button>Calculate</button>
                </div>

            </form>
        
            <br />

            <h3>Results</h3>


            <div className="form-grid">
                <div className="form-group inline">
                    <label htmlFor="pricePerMonth">Price per month</label>
                    <input type="number" id="pricePerMonth" className="form-control" value={state.pricePerMonth} />
                </div>
                <div className="form-group inline">
                    <label htmlFor="saved">Saved</label>
                    <input type="number" id="saved" className="form-control" value={state.saved} />
                </div>
                <div className="form-group inline">
                    <label htmlFor="total">Total</label>
                    <input type="number" id="total" className="form-control" value={state.total} />
                </div>
            </div>
        </main>
    )
}

export default Pricing;