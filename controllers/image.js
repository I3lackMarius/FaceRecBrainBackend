const apiKey = "b35f7987efab4cf0ba49cd2dd140b32f";

const handleApiCall = async (req, res) => {
  const response = await fetch(
    `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Key ${apiKey}`,
      },
      body: JSON.stringify({
        user_app_id: {
          user_id: "clarifai",
          app_id: "main",
        },
        inputs: [
          {
            data: {
              image: {
                url: req.body.input, //"https://images.healthshots.com/healthshots/en/uploads/2023/01/18175821/face-glow.jpg",
              },
            },
          },
        ],
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      //  console.log(data);
      res.json(data); //.outputs[0].data);
      // console.log("res", res);
    })
    .catch((err) => res.status(400).json("Unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  // let found = false;
  // database.users.forEach((user) => {
  //   if (user.id === id) {
  //     found = true;
  //     user.entries++;
  //     return res.json(user.entries);
  //   }
  // });
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      //  console.log(entries[0].entries);
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("Error getting entries"));
  // found ? "" : res.status(404).json("not found");
};

module.exports = {
  handleImage,
  handleApiCall,
};
