Shader "Custom/sphere"
{ Properties
    {
        _MainTex ("Panorama (equirectangular)", 2D) = "white" {}
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        Cull Front // 👈 RENDERIZA LA CARA INTERNA
        ZWrite Off
        Lighting Off

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"

            sampler2D _MainTex;
            float4 _MainTex_ST;

            struct appdata
            {
                float4 vertex : POSITION;
            };

            struct v2f
            {
                float4 vertex : SV_POSITION;
                float3 worldPos : TEXCOORD0;
            };

            v2f vert (appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.worldPos = mul(unity_ObjectToWorld, v.vertex).xyz;
                return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {
                float3 dir = normalize(i.worldPos);
                float2 uv;

                uv.x = 0.5 + atan2(dir.z, dir.x) / (2.0 * UNITY_PI);
                uv.y = 0.5 - asin(dir.y) / UNITY_PI;

                return tex2D(_MainTex, uv);
            }
            ENDCG
        }
    }
    FallBack Off
}
