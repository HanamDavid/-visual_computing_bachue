Shader "Custom/VertexColorTime"
{
    Properties
    {
        _Color1 ("Color Base", Color) = (1,0,0,1)
        _Color2 ("Color Top", Color) = (0,0,1,1)
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 100

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            #include "UnityCG.cginc"

            fixed4 _Color1;
            fixed4 _Color2;

            struct appdata
            {
                float4 vertex : POSITION;
            };

            struct v2f
            {
                float4 pos : SV_POSITION;
                float3 localPos : TEXCOORD0;
            };

            v2f vert (appdata v)
            {
                v2f o;
                o.pos = UnityObjectToClipPos(v.vertex);
                o.localPos = v.vertex.xyz;
                return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {
                // gradiente vertical basado en y local
                float t = saturate(i.localPos.y + 0.5); // ajusta para que vaya 0 a 1

                // color interpolado según altura
                fixed4 col = lerp(_Color1, _Color2, t);

                // componente que cambia con el tiempo
                float timeFactor = (sin(_Time.y * 3.0) + 1) * 0.5;

                col.rgb *= timeFactor;

                return col;
            }
            ENDCG
        }
    }
}
