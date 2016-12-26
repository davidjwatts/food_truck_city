# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Review.delete_all

Review.create(truck_name: "Roadside Rotisserie Corporation / Country Grill",
              body: "best ribs ever",
              rating: 5)

Review.create(truck_name: "Roadside Rotisserie Corporation / Country Grill",
              body: "meh, had better",
              rating: 2)

Review.create(truck_name: "Off the Grid Services, LLC",
              body: "I really wanted a hot dog, but this was okay",
              rating: 3)

Review.create(truck_name: "M M Catering",
              body: "solid food truck experience",
              rating: 4)
