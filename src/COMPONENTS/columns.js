export const COLUMNS = [
  {
    Header:"PRODUCT",
    accessor:"Product",
    Footer:()=>{
        return <>
        total</>
    },
},
{
    Header:"RESELLER",
    accessor:"Reseller"
},
{
    Header:"YEAR",
    accessor:"Year"
},
{
    Header:"QUARTER",
    accessor:"Quarter"
},
{
    Header:"MONTH",
    accessor:"Month"
},
{
    Header:"SUM OF ORDER QUANTITY",
    accessor:"Sum of Order Quantity",
    // Footer:
},
{
    Header:"SUM OF PRODUCT STANDARD COST",
    accessor:"Sum of Product Standard Cost"
},
{
    Header:"SUM OF SALES AMOUNT",
    accessor:"Sum of Sales Amount"
},
{
    Header:"SUB TOTAL",
    accessor:"subtotal"
},
{
    Header:"GRAND TOTAL",
    accessor:"grand total"
},
]

