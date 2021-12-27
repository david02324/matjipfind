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
let myPosMarker: any = null;

export function initalizeMap(container: HTMLElement | null) {
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
}

export function getMyPos() {
  return new Promise<void>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;
      moveMap(latitude, longitude);

      resolve();
    }, reject);
  });
}

function moveMap(latitude: number, longitude: number) {
  // 위치 갱신
  window.kakaoMap.currentPos = new kakao.maps.LatLng(latitude, longitude);

  // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
  myMap.panTo(window.kakaoMap.currentPos);

  // 확대 수준 변경
  myMap.setLevel(3);

  // 기존에 마커가 있다면 위치이동
  if (myPosMarker) {
    myPosMarker.setPosition(window.kakaoMap.currentPos);
  } else {
    // 마커 생성
    myPosMarker = new kakao.maps.Marker({
      position: window.kakaoMap.currentPos,
      draggable: true,
      map: myMap,
    });
    myPosMarker.setMap(myMap);
  }

  const infoWindow = new kakao.maps.InfoWindow({
    content:
      '<div style="width:150px;text-align:center;padding:6px 0;">위치가 부정확하다면 드래그를 통해 정확한 위치로 옮겨주세요!</div>',
  });
  infoWindow.open(myMap, myPosMarker);

  // 마커 드래그 시작시 인포윈도우 삭제
  kakao.maps.event.addListener(myPosMarker, "dragstart", () =>
    infoWindow.close()
  );

  // 마커의 드래그가 끝나면 현재 위치 갱신
  kakao.maps.event.addListener(myPosMarker, "dragend", () => {
    window.kakaoMap.currentPos = myPosMarker.getPosition();
  });
}

export function getCurrentPosByUserInput(userInput: string) {
  // 주소 - 좌표 변환 객체 생성
  const geocoder = new kakao.maps.services.Geocoder();

  return new Promise<void>((resolve, reject) => {
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(userInput, (result: any, status: any) => {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        moveMap(result[0].y, result[0].x);

        resolve();
      } else {
        reject();
      }
    });
  });
}

export interface Result {
  id: string;
  category_name: string;
  place_name: string;
  phone: string;
}

export interface Pagination {
  current: number;
  last: number;
  totalCount: number;
  prevPage: VoidFunction;
  nextPage: VoidFunction;
  gotoFirst: VoidFunction;
  gotoLast: VoidFunction;
}

export function keywordSearch(
  keyword: string,
  distance: number,
  callback: (errMsg?: string, results?: Result[], pagination?: any) => void
): void {
  const markers: any = [];

  // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  // 장소 검색 객체를 생성합니다
  const ps = new kakao.maps.services.Places(myMap);

  // 검색 옵션 객체
  const searchOption = {
    location: window.kakaoMap.currentPos,
    radius: distance,
    size: 9,
  };

  // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  ps.keywordSearch(keyword, searchCallback, searchOption);

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function searchCallback(
    results: Result[],
    status: any,
    pagination: Pagination
  ) {
    switch (status) {
      case kakao.maps.services.Status.OK:
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        callback(undefined, results, pagination);
        break;

      // 로그인이 되어 있는 경우 키워드와 좌표를 저장합니다
      //saveData(id, keyword, currentPos);
      case kakao.maps.services.Status.ZERO_RESULT:
        callback("검색 결과가 존재하지 않습니다!");
        break;
      case kakao.maps.services.Status.ERROR:
        callback("검색 중 오류가 발생했습니다!");
        break;
    }
  }
}

function naverSearch(placeName: string) {
  // 검색어를 띄어쓰기 기준으로 분할
  var nameArr = placeName.split(" ");
  // 띄어쓰기 사이에 +넣어서 join
  var joinedArr = nameArr.join("+");

  // 네이버 검색
  return (
    "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=" +
    joinedArr
  );
}
