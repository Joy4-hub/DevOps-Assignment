# Step 1: Use the official Node.js image from Docker Hub as a base image
FROM node:14

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install the dependencies inside the container
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Expose the port that the app will run on
EXPOSE 3000

# Step 7: Define the command to run the app
CMD ["npm", "start"]
