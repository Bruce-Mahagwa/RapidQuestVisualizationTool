// dependencies
import {useSelector, useDispatch} from "react-redux";

const SalesOverTime = () => {
    // get state from redux store
    const {total_sales} = useSelector(state => state.sales);
    const {daily, monthly, quarterly, yearly, loading, error, period} = total_sales;

    const dispatch = useDispatch();
    
    return (
        'sales over time'
    )
}
export default SalesOverTime