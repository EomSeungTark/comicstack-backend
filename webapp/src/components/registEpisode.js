import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import queryString from 'query-string';
import { Input, Select, Textarea, Button, Stack } from '@chakra-ui/react';
import { useStateUser } from 'contextAPI/user';

const Wrapper = styled.div`
	width: 30%;
	height: 31.25rem;
	margin: 10px auto;
	.file-view {
		width: calc(100% - 65px);
		height: 40px;
		text-overflow: ellipsis;
	}
	.title {
		text-align: center;
		font-size: 30px;
	}
	.sub-title {
		text-align: left;
		font-size: 20px;
	}
	label {
		cursor: pointer;
		margin: 0 auto;
		/* border: 1px solid black; */
		border-radius: 5px;
		background-color: #1aacac;
		padding: 10px;
		height: 40px;
	}
	input[type=file]{
		display: none;
	}
`;

export const RegistEpisode = () => {

	const [imgBase64, setImgBase64] = useState([]); // 파일 base64
 	const [thumbnailFile, setThumbnailFile] = useState(null);	//파일
	const [episodeFile, setEpisodeFile] = useState(null);
	const [thumbnailFileView, setThumbnailFileView] = useState();
	const [episodeFileView, setEpisodeFileView] = useState();
	const [title, setTitle] = useState();
	const [toonId, setToonId] = useState(queryString.parse(window.location.search).toonId || null);
	const [seriesName, setSeriesName] = useState(queryString.parse(window.location.search).seriesName || null);
	const userState = useStateUser();
	const history = useHistory();

	const handleChangeFile = (event, type) => {
    console.log(event.target.files)
		if(type === 1){
			setThumbnailFile(event.target.files);
		} else if(type === 2){
			setEpisodeFile(event.target.files);
		}
    //fd.append("file", event.target.files)
    setImgBase64([]);
    for(let i=0;i<event.target.files.length;i++){
			if (event.target.files[i]) {
				let reader = new FileReader();
				reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
				// 파일 상태 업데이트
				reader.onloadend = () => {
					// 2. 읽기가 완료되면 아래코드가 실행됩니다.
					const base64 = reader.result;
					// console.log(base64)
					if (base64) {
					//  images.push(base64.toString())
					const base64Sub = base64.toString()
						
					setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
					//  setImgBase64(newObj);
						// 파일 base64 상태 업데이트
					//  console.log(images)
					}
				}
			}
  	}

  }

	const imgValue = (file) => {
		if(file){
			if(file.length === 1) {
				return file[0].name;
			} else if(file.length === 0) {
				return "";
			} else {
				return "파일 "+ file.length+"개";
			}
		}
	}

	useEffect(() => {
		setThumbnailFileView(imgValue(thumbnailFile))
	}, [thumbnailFile])

	useEffect(() => {
		setEpisodeFileView(imgValue(episodeFile))
	}, [episodeFile])

	const WriteBoard = async()=> {
    const fd= new FormData();
    Object.values(thumbnailFile).forEach((file) => fd.append("thumbnail_files", file));
		Object.values(episodeFile).forEach((file) => fd.append("toon_files", file));
		fd.append("user_id", userState.entity.user_id);
		fd.append("toon_sid", toonId)
		fd.append("episode_name", title);


    await axios.post('/api/toon/upload', fd, {
			headers: {
				"Content-Type": `multipart/form-data; `,
			}
		})
		.then((response) => {
			if(response.data){
				if(response.data.status){
					history.push("/lecture");
				}
				// history.push("/test1");
			}
		})
		.catch((error) => {
			// 예외 처리
		})
	}

	return (
		<>
			<Wrapper>
				<Stack spacing={4}>
					<div className={"title"}>에피소드 등록</div>
					<div className={"sub-title"}>시리즈: {seriesName}</div>
					<Input 
						placeholder="에피소드 제목  ex) 1부 20화" 
						name={"title"} 
						onChange={(e) => setTitle(e.target.value)}
					/>
					<div>
						<input className={"file-view"} placeholder=" 섬네일 파일 선택" defaultValue={thumbnailFileView || ""} />
						<label htmlFor={"thumbnailFile"}>업로드</label>
						<input 
							type="file"
							id="thumbnailFile" 
							name={"thumbnail_file"} 
							onChange={(event) => handleChangeFile(event, 1)} 
							multiple="multiple"
						/>
					</div>
					<div>
						<input className={"file-view"} placeholder=" 에피소드 파일 선택" defaultValue={episodeFileView || ""} />
						<label htmlFor={"episodeFile"}>업로드</label>
						<input 
							type="file"
							id="episodeFile" 
							name={"thumbnail_file"} 
							onChange={(event) => handleChangeFile(event, 2)} 
							multiple="multiple"
						/>
					</div>
					
					{/* {imgBase64.map((item) => {
						return(
							<img
								className="d-block w-100"
								src={item}
								alt="First slide"
								style={{width:"100%",height:"550px"}}
							/>
						)
					}) } */}
					<Button onClick={WriteBoard}>작성완료</Button>
				</Stack>
			</Wrapper>
		</>
	)
}