Bounded context: Order-Taking

Workflow: "Place Order"
    triggered by: 
        "Order form received" event (when Quote is not checked)
    primary input:
        An order form
    other input:
        Product catalog
    output events:
        "Order placed" event
    side-effects:
        An acknowledgement iss set to the customer along with the placed order

```
data Order = 
    CustomerInfo
    AND ShippingAddress
    AND BillingAddress
    AND list of OrderLines
    AND AmountToBill
```

```
data OrderLine =
    Product
    AND Quantity
    AND Price
```
   
```
data CustomerInfo = ??? // todo: Find out what this is
data BillingAddress = ???
``` 
