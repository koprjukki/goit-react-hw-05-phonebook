import axios from "axios";

const APIKEY = "16796543-1ef82ab592812296a1965d7ca";

const fetchDataWithQuery = ({ query, page = 0 }) =>
	axios.get(
		`https://pixabay.com/api/?q=${query}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`,
	);

export default fetchDataWithQuery;
