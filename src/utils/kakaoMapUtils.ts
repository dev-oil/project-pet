export const loadKakaoMapScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 이미 다 로딩된 경우
    if (
      window.kakao &&
      window.kakao.maps &&
      typeof window.kakao.maps.LatLng === 'function'
    ) {
      resolve();
      return;
    }

    const existingScript = document.getElementById('kakao-map-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => resolve());
        }
      });
      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_KEY
    }&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => resolve());
      }
    };

    script.onerror = reject;

    document.head.appendChild(script);
  });
};
