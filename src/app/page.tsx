import createRequest from "@/utils/request";
import Image from "next/image";
import Link from "next/link.js";

type Example = {
  data: [
    {
      id: string;
      name: string;
      count_test: string;
      count_like: string;
      sector: string;
      image: string;
      credits: string;
      num_question: string;
      created_at: string;
      updated_at: string;
      user_id: string;
      question_id: string;
      username: string;
      avatar: string;
      email: string;
      favorited: string;
      like: string;
    }
  ];
};
export default async function Login() {
  const request = await createRequest();
  const { data } = await request.get<Example>(
    "https://hugn.io.vn/quiz-be/api/get-example"
  );
  return (
    <div>
      <Link href={"/login"}>Test api</Link>
      {data.data.map((item) => {
        return (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <Image
              src={
                item.image ??
                "https://th.bing.com/th/id/OIP.s2SHIZUjABr-gwswyqZhkAHaE7?r=0&o=7rm=3&rs=1&pid=ImgDetMain"
              }
              width={200}
              height={150}
              alt="Ảnh demo"
              className="object-cover w-[200px] h-[150px]"
            />
          </div>
        );
      })}
      <h2></h2>
    </div>
  );
}
