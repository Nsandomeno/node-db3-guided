## SQL JOIN STATEMENT EXAMPLE
    - from W3 Schools SQL TryIt
----------------------------------------------
    SELECT orders.OrderId
	, customers.CustomerName
    , orders.OrderDate
    , shippers.ShipperName
FROM orders
INNER JOIN customers ON orders.customerId = customers.customerId
INNER JOIN shippers ON orders.customerId = customers.customerId
## END OF SQL JOIN STATEMENT EXAMPLE

## JOINS AND TRANSFORMATION SQL EXAMPLE

## END OF SQL JOINS AND TRANSFORMATION EXAMPLE