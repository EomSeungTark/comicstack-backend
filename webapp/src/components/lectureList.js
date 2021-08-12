import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import { useDispatchLectureList, useStateLectureList, getList as getLectureList } from 'contextAPI/lecture';
import { useStateUser } from 'contextAPI/user'
import { Button } from '@chakra-ui/react'

const Warpper = styled.div`
	width: 90%;
	height: auto;
	margin: 0 auto;
	.title {
		width: 100%;
		height: 80px;
		text-align: center;
		font-size: 30px;
		font-weight: bold;
		padding: 20px;
	}

	.card {
		width: calc((100% - 80px) / 4);
		height: calc((100vw - 20px) / 4);
		min-height: 150px;
		display: inline-block;
		margin-left: 20px;
		margin-bottom: 20px;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		background-color: #E2E8F0;
		border-radius: 10px;
		img {
			width: 100%;
			/* 아래 그리드 비율에서 이미지의 비율을 곱한다 */
			height: calc(((100vw - 20px) / 4) / 4.5 * 2.5);
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
		}
		display: inline-grid;
		grid-template-rows: 2.5fr 1fr 1fr;
		grid-template-areas: "thumbnail-zone" "content-zone" "button-zone";
		.thumbnail-zone{
			grid-area: "thumbnail-zone";

		}
		.content-zone{
			grid-area: "content-zone";
			padding: 10px;
			.content-title {
				font-size: 21px;
			}
			.content-context {
				font-size: 12px;
			}
		}
		.button-zone{
			grid-area: "button-zone";
			border-radius: 10px;
			width: 50%;
			margin: 10px auto auto auto;
			background-color: #f1977b;
		}
	}

	.regist-button {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 10px;
	}

`;

export const LectureList = () => {

	const history = useHistory();
	const userState = useStateUser();
	const lectureListState = useStateLectureList();
	const lectureListDispatch = useDispatchLectureList();

	useEffect(() => {
		getLectureList(lectureListDispatch, userState.entity.user_id)
	}, [userState.entity.user_id])

	const goRegistPage = (toonId) => {
		history.push(`/series/episode/upload?toonId=${toonId}`)
	}

	const lectureCard = (state) => {
		return (
			<>
				{state.entities && 
					state.entities.map((item) => (
						<div key={item.toon_sid} className={"card"}>
							<div className={"thumbnail-zone"}>
								<img src={item.thumbnail_path} alt={""}/>
							</div>
							<div className={"content-zone"}>
								<span className={"content-title"}>{item.title}</span>
								<br/>
								<span className={"content-context"}>작품설명: {item.context}</span>
							</div>
							<Button onClick={() => goRegistPage(item.toon_sid)} className={"button-zone"}>새 회차 등록</Button>
						</div>
				))}
			</>
		)
	}

	const goRegistToonPage = () => {
		history.push("/upload")
	}

	return (
		<>
			<Warpper>
				<div className={"title"}>
					내 작품
				</div>
				<div className={"regist-button"}>
					<Button onClick={goRegistToonPage}>새 작품 등록</Button>
				</div>
				{lectureCard(lectureListState)}
			</Warpper>
		</>
	)
}