import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
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

export const RegistCartoon = () => {

	const [imgBase64, setImgBase64] = useState([]); // 파일 base64
 	const [imgFile, setImgFile] = useState(null);	//파일
	const [fileView, setFileView] = useState();
	const [webToonUploadDay, setWebToonUploadDay] = useState();
	const [title, setTitle] = useState();
	const [summary, setSummary] = useState();
	const [genre, setGenre] = useState();
	const userState = useStateUser();
	const history = useHistory();

	const day = ["월", "화", "수", "목", "금", "토", "일"]
	const genreList = ["액션", "로맨스", "드라마", "스릴러"]

	const handleChangeFile = (event) => {
    console.log(event.target.files)
    setImgFile(event.target.files);
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

	useEffect(() => {
		const imgValue = () => {
			if(imgFile){
				if(imgFile.length === 1) {
					return imgFile[0].name;
				} else if(imgFile.length === 0) {
					return "";
				} else {
					return "파일 "+ imgFile.length+"개";
				}
			}
		}

		setFileView(imgValue())
	}, [imgFile])

	const WriteBoard = async()=> {
    const fd = new FormData();
    Object.values(imgFile).forEach((file) => fd.append("thumbnail_file", file));
		fd.append("user_id", userState.entity.user_id);
		fd.append("title", title);
		fd.append("day", webToonUploadDay);
		fd.append("pass", true);
		fd.append("context", summary);
		fd.append("genre", genre);


    await axios.post('/api/toon/regist', fd, {
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
					<div className={"title"}>강의 등록</div>
					<Input 
						placeholder="강의 제목" 
						name={"title"} 
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Select placeholder="연재일" onChange={(e) => setWebToonUploadDay(e.target.value)}>
						{
							day.map((item) => (
								<option key={item} value={item}>{item}</option>
							))
						}
					</Select>
					<Select placeholder="장르" onChange={(e) => setGenre(e.target.value)}>
						{
							genreList.map((item) => (
								<option key={item} value={item}>{item}</option>
							))
						}
					</Select>
					<Textarea placeholder="줄거리" onChange={(e) => setSummary(e.target.value)}/>
					<div>
						<input className={"file-view"} placeholder=" 파일 선택" value={fileView} />
						<label htmlFor={"file"}>업로드</label>
						<input 
							type="file"
							id="file" 
							name={"thumbnail_file"} 
							onChange={handleChangeFile} 
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