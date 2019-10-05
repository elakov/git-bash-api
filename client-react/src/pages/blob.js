import React from 'react'
import Page from './page';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from 'react-router-dom';
import Editor from "../blocks/Editor/Editor";
import Blob from "../model/blob";
import {loadBlob} from "../redux/files/actions";

const createBlobTabs = (matchUrl, repoId, hash = 'master', path = '') => {
	const blobUrl = `/repository/${repoId}/blob/${hash}/${path}`;
	const commitsUrl = `/repository/${repoId}/commits/${hash}/${path}`;
	return [
		{
			text: 'details',
			url: blobUrl,
			isActive: matchUrl.includes(blobUrl),
		},
		{
			text: 'history',
			url: commitsUrl,
			isActive: matchUrl.includes(commitsUrl),
		}
	];
};

const BlobPage = (props) => {
	const {id, hash, path = ''} = props.match.params;
	const {url} = props.match;
	const tabs = createBlobTabs(url, id, hash, path);
	const dispatch = useDispatch();
	const blobId = Blob.createId(id, hash, path);
	const blob = useSelector(({files}) => files.blobs[blobId] || null);
	const isLoading = useSelector(({files}) => files.loadingBlob);
	const error = useSelector(({files}) => files.loadingBlobError);

	if (!path) {
		return <Redirect to={`/repository/${id}/tree/${hash}`}/>
	}

	if (error) {
		return <Redirect to={`/404/`}/>
	}

	if (!isLoading && !blob) {
		dispatch(loadBlob(id, hash, path,));
	}

	return (
		<Page {...props} tabs={tabs}>
			{
				isLoading ?
					<div>Loading...</div> :
					<Editor/>
			}
		</Page>
	);
};

export default BlobPage;

