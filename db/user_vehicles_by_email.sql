SELECT vehicles.make, vehicles.model, users.email FROM vehicles
JOIN users ON vehicles.ownerId = users.id
WHERE users.email = $1;