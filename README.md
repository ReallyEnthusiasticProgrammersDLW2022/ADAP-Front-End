# ADAP-Front-End

## Motivation
Really Enthusiastic Programmers' team submission for Deep Learning Week (DLW) hackathon 2022, organised by NTU's MLDA.

## Installation
Clone this repo
Generate your firebase configuration at (https://console.firebase.google.com) and add the details at front-end\data\config.js
```bash
# Installs all dependencies
npm install
# Runs the expo server
npm start 
```
To see the app in action, download Expo Go App on your IOS or Andriod device and scan the generated QR code displayed in the CLI

## Tech Frameworks
Frontend is built using React Native with tailwind as CSS to ensure cross-platform device compatiability.
Server is hosted with flask and it holds our data processing models. Our data processing models are implemented with PyTorch and TensorFlow and they comprise of an Image Segmentation Model (Google DeepLab v3+) to process input images and two Artificial Neural Networks to generate the respective scores.  
Firebase Database is used for the storage of uploaded images, processed images as well as the generated scores.

## Application Demonstration
https://user-images.githubusercontent.com/77315991/193447824-82c7f2bf-047c-4e90-a7b7-4623c15d1d0c.mp4
