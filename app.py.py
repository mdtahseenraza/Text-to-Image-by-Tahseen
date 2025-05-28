!pip install diffusers transformers torch accelerate

import torch
from diffusers import StableDiffusionPipeline
from PIL import Image
import matplotlib.pyplot as plt

model_id = "stabilityai/stable-diffusion-2-1"
device = "cuda" if torch.cuda.is_available() else "cpu"

pipe = StableDiffusionPipeline.from_pretrained(
    model_id,
    torch_dtype=torch.float16,
    use_auth_token="your_huggingface_token"
)
pipe = pipe.to(device)

prompt = "A futuristic cityscape with neon lights and ablah bah, highly detailed, vibrant colors, cinematic lighting"
negative_prompt = "blurry, low quality, distorted, extra limbs, deformed, ugly, low contrast, text, watermark"

parameters = {
    "prompt": prompt,
    "negative_prompt": negative_prompt,
    "num_inference_steps": 50,
    "guidance_scale": 7.5,
    "num_images_per_prompt": 2,
    "height": 512,
    "width": 512,
    "seed": 42,
    "eta": 0.0,
    "strength": 0.8
}

generator = torch.Generator(device=device).manual_seed(parameters["seed"])

outputs = pipe(
    prompt=parameters["prompt"],
    negative_prompt=parameters["negative_prompt"],
    num_inference_steps=parameters["num_inference_steps"],
    guidance_scale=parameters["guidance_scale"],
    num_images_per_prompt=parameters["num_images_per_prompt"],
    height=parameters["height"],
    width=parameters["width"],
    generator=generator,
    eta=parameters["eta"]
)

for i, image in enumerate(outputs.images):
    image.save(f"generated_image_{i+1}.png")
    print(f"Image {i+1} saved as 'generated_image_{i+1}.png'")
    plt.figure(figsize=(8, 8))
    plt.imshow(image)
    plt.axis("off")
    plt.title(f"Generated Image {i+1}")
    plt.show()

parameter_sweep = {
    "guidance_scale_values": [5.0, 7.5, 10.0],
    "num_inference_steps_values": [20, 50]
}

for guidance in parameter_sweep["guidance_scale_values"]:
    for steps in parameter_sweep["num_inference_steps_values"]:
        print(f"\nGenerating with guidance_scale={guidance}, num_inference_steps={steps}")
        output = pipe(
            prompt=parameters["prompt"],
            negative_prompt=parameters["negative_prompt"],
            num_inference_steps=steps,
            guidance_scale=guidance,
            num_images_per_prompt=1,
            height=parameters["height"],
            width=parameters["width"],
            generator=torch.Generator(device=device).manual_seed(parameters["seed"]),
            eta=parameters["eta"]
        )
        image = output.images[0]
        image.save(f"image_guidance_{guidance}_steps_{steps}.png")
        print(f"Saved as 'image_guidance_{guidance}_steps_{steps}.png'")
        plt.figure(figsize=(8, 8))
        plt.imshow(image)
        plt.axis("off")
        plt.title(f"Guidance: {guidance}, Steps: {steps}")
        plt.show()
