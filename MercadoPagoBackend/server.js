const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors());

mercadopago.configure({
  access_token: "TEST-1226875170104875-090109-23b5e04512e807ee704e94eee96edd1f-1467437508",
});

app.get("/", function (req, res) {
  res.send("el servidor de mercado pago funciona! :)");
});

app.post("/create_preference", (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
        
      },
    ],
    payer: {
      name: "Luciano",
      surname: "Rojas",
      email: "luciano297801@hotmail.com",
      phone: {
          area_code: "3704",
          number: 518541
      },
      identification: {
          type: "DNI",
          number: "43452239"
      },

    },
    back_urls: {
      success: "http://localhost:3000",
      failure: "http://localhost:3000",
      pending: "",
    },
    binary_mode: true,
    auto_return: "approved",
    payment_methods: {
      excluded_payment_types: [
        {
          id: "ticket"
        }
      ],
      installments: 3
    }
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(8080, () => {
  console.log("the server is now running on port 8080");
});