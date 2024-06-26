import AnswersTab from "@/components/shared/AnswersTab";
import ProfileLink from "@/components/shared/ProfileLink";
import QuestionsTab from "@/components/shared/QuestionsTab";
import RenderTag from "@/components/shared/RenderTag";
import Stats from "@/components/shared/Stats";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTopInteractedTags } from "@/lib/actions/tag.actions";
import { getUserInfo } from "@/lib/actions/user.action";
import { getJoinedDate } from "@/lib/utils";
import { URLProps } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

async function ProfilePage({ params, searchParams }: URLProps) {
  const { userId: clerkId } = auth();
  const { user, totalQuestions, totalAnswers, badgeCounts, reputation } =
    await getUserInfo({
      userId: params.id,
    });
  const topInteractedTags = await getTopInteractedTags({ userId: user._id });

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={user.picture}
            alt="profile picture"
            height={140}
            width={140}
            className="rounded-full object-cover"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{user.name}</h2>
            <p className="paragraph-regular text-dark200_light800">
              @{user.username}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={user.portfolioWebsite}
                  title="portfolio"
                />
              )}

              {user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={user.location}
                />
              )}

              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(user.joinedAt)}
              />
            </div>

            {user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-xs:w-full sm:mt-3">
          <SignedIn>
            {clerkId === user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <Stats
        reputation={reputation}
        totalQuestions={totalQuestions}
        totalAnswers={totalAnswers}
        badges={badgeCounts}
      />

      <div className="mt-10 flex gap-10 max-lg:flex-col-reverse">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="top-posts"
            className="mt-5 flex w-full flex-col gap-6"
          >
            <QuestionsTab
              searchParams={searchParams}
              clerkId={clerkId}
              userId={user._id}
            />
          </TabsContent>

          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <AnswersTab
              searchParams={searchParams}
              clerkId={clerkId}
              userId={user._id}
            />
          </TabsContent>
        </Tabs>

        <div className=" min-w-[278px]">
          <h3 className="h3-bold text-dark200_light900">Top Tags</h3>
          <div className="mt-7 grid gap-4">
            {topInteractedTags.map((tag) => (
              <RenderTag
                key={tag.tagId}
                _id={tag.tagId}
                name={tag.name}
                totalQuestions={tag.count}
                showCount
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
