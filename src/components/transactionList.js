import React, {useState, useEffect} from "react";
import { message, Spin, Tag } from "antd";
import {FcBusinesswoman, FcCalendar, FcMoneyTransfer, FcRating} from 'react-icons/fc';
import 'antd/dist/antd.css';
import { Tooltip } from 'antd';

const TransactionList = (props) => {

    const [transactionList, setTransactionList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        fetch('http://localhost:3000/transactions', {method: 'GET',"Content-Type": 'application/json'})
        .then((res)=>{
            return res.json()
        })
        .then(result => {
            let transactions = [...transactionList]
            result.map((transaction) => {
                let obj = {...transaction}
                obj.reward_point = rewardPoints(transaction.transaction_amount)
                transactions.push(obj)
                return null
            })
            setTransactionList(transactions)
            setLoading(false)
        })
        .catch(err=>{
            message.error(err)
            setLoading(false)
        },[])
    })

    const rewardPoints = (transactionAmount) => {
        if (transactionAmount >100){
            return (2*(transactionAmount-100) + 50);
        }
        else if(transactionAmount > 50){
            return (transactionAmount - 50)
        }
        return 0
    }
    

    return(
        <Spin spinning={ loading }>
            <div className='header'>
                <br/><br/>
                <h2>REWARD POINT CALCULATOR</h2>
                <br/>
            </div>
           
            {
                transactionList.map( ( transaction, index ) => (
                    <div className="card-preview" style={ {height:'70px', cursor: 'pointer', width:'100%' } }>
                    <div style={ { margin: '7px', padding: '5px', fontSize: '15px'} }  className="row ant-card ant-card-bordered" key={ index }>
                     
                        <div className="col-1" >
                            <Tag color="blue" size='2rem'>
                                {transaction.transaction_id}
                            </Tag>
                        </div>
                        <div className="col-3"><FcBusinesswoman size='2rem'/><Tooltip title="Customer Name">{transaction.customer_name}</Tooltip></div>
                        <div className="col-3"><FcCalendar size='2rem'/><Tooltip title="Transaction Date"> {transaction.transaction_date}</Tooltip></div>
                        <div className="col-3"><FcMoneyTransfer size='2rem'/><Tooltip title="Transaction Amount">{transaction.transaction_amount}</Tooltip></div>
                        <div className="col-2"><FcRating size='2rem'/><Tooltip title="Reward Point">{transaction.reward_point}</Tooltip></div>
                   
                        </div>
                        </div>
                ))
            }

        </Spin>
    )

}

export default TransactionList;