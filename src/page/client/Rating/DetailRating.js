import React, { useState, useEffect } from "react";
import { Rate } from "antd";
import { Input } from "antd";
import { error, success } from "utils/messageAnt";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TextArea from "antd/lib/input/TextArea";
const DetailRating = () => {
  const { id } = useParams();
  const { auth } = useSelector((data) => data);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [star, setStar] = useState("");
  const [comment, setComment] = useState("");
  const { handleSubmit } = useForm();
  const detailHistory = async () => {
    let url = `https://api-booking-baber.up.railway.app/api/comments/${id}`;
    const res = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${auth.customerAuth.token}`,
        },
      })
      .then((data) => {
        if (data?.status === 200) {
          setData(data?.data.data);
        } else {
          setData([]);
        }
      });
  };
  useEffect(() => {
    detailHistory(id);
  }, []);
  const onSubmit = async () => {
    let url = `https://api-booking-baber.up.railway.app/api/comments/${id}`;
    let formData = new FormData();
    formData.append("user_id", data.user_id);
    formData.append("book_id", data.id);
    formData.append("star", star);
    formData.append("content", comment);
    const res = await axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${auth.customerAuth.token}`,
        },
      })
      .then((data) => {
        console.log(data);
        if (data?.data.status === 200) {
          success("Đánh giá thành công, bạn sẽ về trang đánh giá sau 2s");
          setTimeout(() => {
            navigate("/history");
          }, 2000);
        } else {
          error("Đánh giá thất bại");
        }
      });
  };
  return (
    <div className="flex flex-col items-center h-auto lg:m-auto">
      <p className="text-3xl font-bold  mt-8 mb-0">Đánh giá</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="user_id" value={data.user_id} />
        <input type="hidden" name="book_id" value={data.id} />
        <div className="flex flex-col items-center w-full">
          <div className="py-8 md:pb-10" name="star">
            <Rate
              style={{ fontSize: "40px" }}
              theme="outlined"
              onChange={(value) => {
                setStar(value);
              }}
              value={star}
            />
          </div>
          <div className="w-full px-4  md:w-[900px] md:px-10" name="content">
            <TextArea
              name="content"
              placeholder="
                Hãy để lại ý kiến của bạn sau khi trải nghiệm dịch vụ của chúng tôi (tối đa 150 ký tự)"
              maxLength={150}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            />
          </div>
          <input type="hidden" />
          <div className="my-10">
            <button className="text-black text-lg uppercase cursor-pointer h-12 w-56 rounded-lg">
              lưu đánh giá
            </button>
          </div>
        </div>
      </form>
      {/*  Cơ sở sử dụng dịch vụ */}
      <div className="p-8 w-full border border-black rounded-lg flex justify-start flex-col shadow-lg shadow-indigo-500/40 lg:w-[800px]">
        <div className="flex flex-col py-2">
          <h3 className="">{data.name_store}</h3>
          <div className="flex justify-between w-32 opacity-70 ">
            {data.date}
          </div>
        </div>
        <div className="flex flex-col items-center  md:flex md:flex-row">
          <div className="image__stylist">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg"
              width="180px"
            />
          </div>
          <div className="px-2 mt-4">
            <p className="p-2">Stylist : {data.staff_name}</p>
            <div className="flex">
              <p className="p-2">Dịch vụ :</p>
              <div className="flex flex-col">
                {data?.name_service?.map((item) => (
                  <p className="py-2 flex">{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRating;
