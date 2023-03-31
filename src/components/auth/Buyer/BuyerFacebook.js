import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginFacebook } from "../../../redux/actions/authActions";

export default function BuyerFacebook() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buyer = useSelector((state) => state.auth.buyer);

  const fragment = window.location.hash.substring(1);
  const accessToken = fragment.split("&")[0].split("=")[1];
  const tokenType = fragment.split("&")[2].split("=")[1];

  useEffect(() => {
    const token = { accessToken: accessToken, tokenType: tokenType };
    dispatch(loginFacebook(token));
  }, [accessToken, dispatch, tokenType]);

  useEffect(() => {
    const goHomePage = () => navigate("/");
    buyer.isAuthentication && goHomePage();
  }, [buyer, navigate]);
}
