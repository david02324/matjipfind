var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.56646, 126.98121), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
        mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
    };

// 지도를 생성한다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 현재 위치
var currentPos;


function locationLoadSuccess(pos){
    // 지도 이동
    moveMap(pos.coords.latitude,pos.coords.longitude);
};

function locationLoadError(){
    alert('위치 정보를 가져오는데 실패했습니다 :( 직접선택 기능을 이용해주세요.');
};

// 위치 가져오기 버튼 클릭시
function getCurrentPosBtn(){
    navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError);
};

function getCurrentPosByPickBtn(){
    var userInput = prompt('대략적인 위치를 입력해주세요!(서울시 강남구 삼성동)');

    // 주소 - 좌표 변환 객체 생성
    var geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(userInput, function(result, status) {

        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
            moveMap(result[0].y, result[0].x);
        }
    });
}

// 검색 버튼 클릭시
function keywordSearch(){
    var keyword = $('#keyword').val();
    var id = $('#userId').val();
    var distance = $("input[name='distance']:checked").val();
    var markers = [];

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({zIndex:1});

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places(map);

    // 검색 옵션 객체
    var searchOption = {
        location: currentPos,
        radius: distance,
        size: 9
    };

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword,placesSearchCB,searchOption);

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {

            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlacesOnSidebar(data);

            // 페이지 번호를 표출합니다
            displayPagination(pagination);

            // 로그인이 되어 있는 경우 키워드와 좌표를 저장합니다
            saveData(id,keyword,currentPos);

        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

            alert('검색 결과가 존재하지 않습니다.');
            return;

        } else if (status === kakao.maps.services.Status.ERROR) {

            alert('검색 중 오류가 발생했습니다.');
            return;

        }
    }

    // 사이드바에 결과 출력 + 마커 생성
    function displayPlacesOnSidebar(places) {

        var listEl = document.getElementById('placesList'),
            menuEl = document.getElementsByClassName('result-list'),
            fragment = document.createDocumentFragment(),
            bounds = new kakao.maps.LatLngBounds(),
            listStr = '';

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        for ( var i=0; i<places.length; i++ ) {

            // 마커를 생성하고 지도에 표시합니다
            var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                marker = addMarker(placePosition, i),
                itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);

            // 마커와 검색결과 항목에 mouseover 했을때
            // 해당 장소에 인포윈도우에 장소명을 표시합니다
            // mouseout 했을 때는 인포윈도우를 닫습니다
            (function(marker, title) {
                kakao.maps.event.addListener(marker, 'mouseover', function() {
                    displayInfowindow(marker, title);
                });

                kakao.maps.event.addListener(marker, 'mouseout', function() {
                    infowindow.close();
                });

                itemEl.onmouseover =  function () {
                    displayInfowindow(marker, title);
                };

                itemEl.onmouseout =  function () {
                    infowindow.close();
                };
            })(marker, places[i].place_name);

            fragment.appendChild(itemEl);
        }

        // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    }


// 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {

        var el = document.createElement('li'),
            itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info" style="background: white;" >' +
                '<a href="'+naverSearch(places.place_name)+'" target="_blank" title="클릭시 네이버 검색" style="display: block; ' +
                'color: black; text-decoration: none">' +
                '<h5>' + places.place_name + '</h5>';

        if(places.phone != '') {
            itemStr += '  <span class="tel">' + places.phone + '</span>';
        } else{
            itemStr += '  <span class="tel">클릭으로 전화번호를 확인해주세요</span> ';
        }
        itemStr += '</a></div>';

        el.innerHTML = itemStr;
        el.className = 'item';

        return el;
    }

    function naverSearch(placeName){
        // 검색어를 띄어쓰기 기준으로 분할
        var nameArr = placeName.split(' ');
        // 띄어쓰기 사이에 +넣어서 join
        var joinedArr = nameArr.join('+');

        // 네이버 검색
        return 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=' + joinedArr;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
            imgOptions =  {
                spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage
            });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker);  // 배열에 생성된 마커를 추가합니다

        return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
        for ( var i = 0; i < markers.length; i++ ) {
            markers[i].setMap(null);
        }
        markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    function displayPagination(pagination) {
        var paginationEl = document.getElementById('pagination'),
            fragment = document.createDocumentFragment(),
            i;

        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild (paginationEl.lastChild);
        }

        for (i=1; i<=pagination.last; i++) {
            var el = document.createElement('a');
            el.href = "#";
            el.innerHTML = i;

            if (i===pagination.current) {
                el.className = 'on';
            } else {
                el.onclick = (function(i) {
                    return function() {
                        pagination.gotoPage(i);
                    }
                })(i);
            }

            fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker, title) {
        var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

        infowindow.setContent(content);
        infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
        }
    }
}


function saveData(id,keyword,position){
    // 로그인 정보가 없을 경우 종료
    if (id == undefined)
        return;

    $.ajax({
        url:"data",
        type:'POST',
        data: {
            "id" : id,
            "keyword": keyword,
            "position": position.toString() },
    }).done(function () {
        $('.last-keyword').html(keyword).click(function (){
            $('#keyword').val(keyword).focus();
        });
    });
}

function loadLastPosition(position){
    if(position==undefined)
        return;

    var splited = position.split(',');
    var latitude = Number(splited[0].substr(1));
    var longittude = Number(splited[1].substr(0,splited[1].length-1));

    // 지도 이동
    moveMap(latitude,longittude);
}

// 현재 위치 마커
var marker;

function moveMap(latitude,longittude){
    // 위치 갱신
    currentPos = new kakao.maps.LatLng(latitude,longittude);

    // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
    map.panTo(currentPos);

    // 확대 수준 변경
    map.setLevel(3);

    // 기존에 마커가 있다면 위치이동
    if(marker != undefined){
        marker.setPosition(currentPos);
    } else{
        // 마커 생성
        marker = new kakao.maps.Marker({
            position: currentPos,
            draggable: true,
            map: map
        });
        marker.setMap(map);
    }

    var infowindow = new kakao.maps.InfoWindow({
        content: '<div style="width:150px;text-align:center;padding:6px 0;">' +
            '위치가 부정확하다면 드래그를 통해 정확한 위치로 옮겨주세요!</div>'
    });
    infowindow.open(map, marker);

    // 마우스를 마커에 올릴 시 인포윈도우 삭제
    kakao.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.close();
    });

    // 마커의 드래그가 끝나면 현재 위치 갱신
    kakao.maps.event.addListener(marker, 'dragend', function() {
        currentPos = marker.getPosition();
    });
}