// uniform vec2 uResolution;
// uniform sampler2D uPictureTexture;
// varying vec3 vColor;
// uniform sampler2D uDisplacementTexture;
// attribute float aIntensity;
// attribute float aAngle;


// void main()
// {

//     // Displacement
//     vec3 newPosition = position;
//     float displacementIntensity = texture(uDisplacementTexture, uv).r;
//     displacementIntensity = smoothstep(0.1, 0.3, displacementIntensity);

//     vec3 displacement = vec3(
//         cos(aAngle) * 0.2,
//         sin(aAngle) * 0.2,
//         1.0
//     );
//     displacement = normalize(displacement);
//     displacement *= displacementIntensity;
//     displacement *= 3.0;
//     displacement *= aIntensity;

//     newPosition += displacement;
//     // vec3 pos = mix(position, newPosition, useNewPosition);
//     // Final position
//     vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
//     vec4 viewPosition = viewMatrix * modelPosition;
//     vec4 projectedPosition = projectionMatrix * viewPosition;

//     // Picture
//     float pictureIntensity = texture(uPictureTexture, uv).r;
//     // float pictureIntensity = texture(uDisplacementTexture, uv).r;
//     gl_Position = projectedPosition;

//     // Point size
//     gl_PointSize = 0.15 * pictureIntensity * uResolution.y;
//     gl_PointSize *= (1.0 / - viewPosition.z);

//   // Varyings
//     vColor = vec3(pow(pictureIntensity, 2.0));
// }

uniform vec2 uResolution;
uniform sampler2D uPictureTexture;
varying vec3 vColor;
uniform sampler2D uDisplacementTexture;
attribute float aIntensity;
attribute float aAngle;


uniform float useNewPosition;

void main()
{
    // Displacement
    vec3 newPosition = position;
    float displacementIntensity = texture(uDisplacementTexture, uv).r;
    displacementIntensity = smoothstep(0.1, 0.3, displacementIntensity);

    vec3 displacement = vec3(
        cos(aAngle) * 0.2,
        sin(aAngle) * 0.2,
        1.0
    );
    displacement = normalize(displacement);
    displacement *= displacementIntensity;
    displacement *= 3.0;
    displacement *= aIntensity;
    newPosition += displacement;

    // Final position
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Picture
    float pictureIntensity = texture(uPictureTexture, uv).r;
    // float pictureIntensity = texture(uDisplacementTexture, uv).r;
    // Point size
    gl_PointSize = 0.15 * pictureIntensity * uResolution.y;
    gl_PointSize *= (1.0 / - viewPosition.z);
    // Varyings
    vColor = vec3(pow(pictureIntensity, 2.0));
}