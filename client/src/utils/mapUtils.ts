declare global {
  interface Window {
    kakao: any;
    kakaoMap: {
      map: any;
      currentPos: any;
    };
  }
}
const kakao = window.kakao;
let myMap: any = null;
let marker: any = null;

export const initalizeMap = (container: HTMLElement | null) => {
  const { kakao } = window;
  const initPos = new kakao.maps.LatLng(37.56646, 126.98121);
  const mapOption = {
    center: initPos, // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
    mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
  };

  const initMap = new kakao.maps.Map(container, mapOption);

  window.kakaoMap = {
    map: initMap,
    currentPos: initPos,
  };
  myMap = window.kakaoMap.map;
};

export const getMyPos = () =>
  navigator.geolocation.getCurrentPosition(onGetMyPosSuccess, onGetMyPosFail);

const onGetMyPosSuccess = (pos: GeolocationPosition) => {
  const { latitude, longitude } = pos.coords;
  moveMap(latitude, longitude);
};

const onGetMyPosFail = () =>
  alert(
    "위치 조회에 실패했습니다! 잠시 후 다시 시도하거나 위치를 직접입력해주세요!"
  );

function moveMap(latitude: number, longitude: number) {
  // 위치 갱신
  window.kakaoMap.currentPos = new kakao.maps.LatLng(latitude, longitude);

  // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
  myMap.panTo(window.kakaoMap.currentPos);

  // 확대 수준 변경
  myMap.setLevel(3);

  // 기존에 마커가 있다면 위치이동
  if (marker) {
    marker.setPosition(window.kakaoMap.currentPos);
  } else {
    // 마커 생성
    marker = new kakao.maps.Marker({
      position: window.kakaoMap.currentPos,
      draggable: true,
      map: myMap,
    });
    marker.setMap(myMap);
  }

  const infoWindow = new kakao.maps.InfoWindow({
    content:
      '<div style="width:150px;text-align:center;padding:6px 0;">위치가 부정확하다면 드래그를 통해 정확한 위치로 옮겨주세요!</div>',
  });
  infoWindow.open(myMap, marker);

  // 마커 드래그 시작시 인포윈도우 삭제
  kakao.maps.event.addListener(marker, "dragstart", () => infoWindow.close());

  // 마커의 드래그가 끝나면 현재 위치 갱신
  kakao.maps.event.addListener(marker, "dragend", () => {
    window.kakaoMap.currentPos = marker.getPosition();
  });
}

export function getCurrentPosByUserInput(userInput: string) {
  // 주소 - 좌표 변환 객체 생성
  var geocoder = new kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(userInput, (result: any, status: any) => {
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      moveMap(result[0].y, result[0].x);
    } else {
      alert("알 수 없는 지역입니다!");
    }
  });
}
