import React,{ useEffect } from 'react';
import * as BABYLON from 'babylonjs';
import checker from '../public/patterns/anotherChekerboardPattern.png'

function ThreeDComp(props){
    useEffect(()=>{
        let canvas = document.getElementById('renderCanvas');
// Load the 3D engine
        let engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
// CreateScene function that creates and return the scene
        let createScene = function(){
            // Create a basic BJS Scene object
            let scene = new BABYLON.Scene(engine);
            // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
            // let camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
            let camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(65), 10, BABYLON.Vector3.Zero(), scene);
            // Target the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());
            // Attach the camera to the canvas
            camera.attachControl(canvas, true);
            // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
            let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
            let ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);

            let groundMaterial = new BABYLON.StandardMaterial("Ground Material", scene);
            ground.material = groundMaterial;
            ground.material.diffuseColor = BABYLON.Color3.Red();
            let groundTexture = new BABYLON.Texture(checker.src, scene);
            ground.material.diffuseTexture = groundTexture;

            // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
            // let sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
            const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
            // Move the sphere upward 1/2 of its height
            // sphere.position.y = 1;
            box.position.y = .5

            // Add sound sound
            // const sound = new BABYLON.Sound("name", "url to sound file", scene, null, { loop: true, autoplay: true });
            // sound.play()

            // Return the created scene
            return scene;
        }
// call the createScene function
        let scene = createScene();
// run the render loop
        engine.runRenderLoop(function(){
            scene.render();
        });
// the canvas/window resize event handler
        window.addEventListener('resize', function(){
            engine.resize();
        });
    },[])
    return (
        <div>
            <canvas id="renderCanvas" className='h-screen-h'></canvas>
        </div>
    );
}

export default ThreeDComp;
