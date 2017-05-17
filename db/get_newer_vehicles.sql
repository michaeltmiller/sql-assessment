SELECT vehicles.make, vehicles.model, vehicles.year, users.firstname, users.lastname
FROM vehicles
JOIN users on vehicles.ownerId = users.id
WHERE vehicles.year > 2000
ORDER BY year desc;