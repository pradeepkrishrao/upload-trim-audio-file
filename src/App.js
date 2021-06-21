import React from 'react';
import axios from 'axios';
import './App.css'
import wavefile from './upload/wavefile.wav';
import $ from 'jquery';

export default function App() {
	const [uploadFile, setUploadFile] = React.useState();
	const [fileBrowse, setFileBrowse] = React.useState();
	const [uploadResponse, setUploadResponse] = React.useState();

	const submitForm = event => {
		event.preventDefault();

		const dataArray = new FormData();
		dataArray.append('fileBrowse', fileBrowse);
		dataArray.append('uploadFile', uploadFile);

		axios
			.post({ wavefile }, dataArray, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(response => {
				setUploadResponse(`File uploaded
        POST - fileBrowse
        FILE - uploadFile`);
			})
			.catch(error => {
				setUploadResponse(`File uploaded
        POST - fileBrowse
        FILE - uploadFile`);
			});
	};

	$(document).ready(function() {
		$('[name="start_time"]').click(function() {
			var cur_time = $('[name="sound"]').get(0).currentTime;
			$('[name="limited_sound"]').attr('data-start_time', cur_time);
			$('[name="select_start_time"]').text((cur_time / 100).toFixed(2));
		});

		$('[name="end_time"]').click(function() {
			var cur_time = $('[name="sound"]')
				.get(0)
				.currentTime.toFixed(2);
			$('[name="limited_sound"]').attr('data-end_time', cur_time);
			$('[name="select_end_time"]').text((cur_time / 100).toFixed(2));
		});

		$('[name="limited_sound"]').click(function() {
			var starttime = $(this).attr('data-start_time');
			var endtime = $(this).attr('data-end_time');
			var $audio = $('[name="limit_sound"]');
			var audio_src = $('source', $audio).attr('src');
			var splt_audio_src = audio_src.split('#');
			//
			$('source', $audio).attr(
				'src',
				splt_audio_src[0] + '#t=' + starttime + ',' + endtime
			);
			var media = $audio.get(0);
			media.load();
			media.play();
		});
	});

	return (
		<div className="marg">
			<form onSubmit={submitForm}>
				<input
					type="text"
					onChange={e => setFileBrowse(e.target.value)}
					placeholder={'File browse'}
				/>
				<input type="file" onChange={e => setUploadFile(e.target.files)}/>
				<input type="submit" value="Upload"/>
			</form>
			<hr/>
			<pre className="marg1">{uploadResponse}</pre>
			<hr/>
			<div class="full-sound">
				<audio name="sound" controls controlsList="nodownload">
					<source src="./upload/wavefile.wav" type="audio/wav" />
				</audio>
			</div>
			<input type="button" name="start_time" value="Start time"/> →
			<label name="select_start_time" />
			<input type="button" name="end_time" value="End time"/> →
			<label name="select_end_time" />
			<hr/>
			<div>
				<input
					type="button"
					name="limited_sound"
					value="Play the trimmed audio"
					data-start_time=""
					data-end_time=""
				/>
			</div>
			<audio
				name="limit_sound"
				preload="auto"
				controls
				controlsList="nodownload"
			>
				<source src="./upload/wavefile.wav" type="audio/wav" />
			</audio>
		</div>
	);
}

		




