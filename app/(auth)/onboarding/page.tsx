/*
currentUser = json object chứa {"id":"user_2XMJv5taS2neHdXPVqay72WrSP4","passwordEnabled":false,"totpEnable...
*/

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import OnboardingForm from "@/components/onboarding/OnboardingForm";

async function Page() {

    //Đợi user đăng nhập bằng clerk
    const user = await currentUser();

    if (!user) return null; // to avoid typescript warnings

    //Lấy thông tin bằng hàm fetchUser
    const userInfo = await fetchUser(user.id);

    //onboarded = đã hoàn thành đăng ký trước đó chưa
    if (userInfo?.onboarded) redirect("/");

    //Nếu chưa onboarded thì tạo user mới
    const userData = {
        id: user.id,
        objectId: userInfo?._id,
        username: userInfo ? userInfo?.username : user.username,
        name: userInfo ? userInfo?.name : user.firstName ?? "",
        bio: userInfo ? userInfo?.bio : "",
        image: userInfo ? userInfo?.image : user.imageUrl,
    };

    return (
        <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
            <h1 className='text-4xl'>Onboarding</h1>
                <p className='mt-3 text-base-regular'>
                    Complete your profile now, to use Quizzy.
                </p>

            <section className='mt-9 border border-gray-400 bg-white rounded-md p-10'>
                <OnboardingForm user={userData} btnTitle='Continue' />
            </section>
        </main>
    );
}

export default Page;