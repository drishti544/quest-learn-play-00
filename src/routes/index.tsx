import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  CircleHelp,
  Flame,
  LockKeyhole,
  Medal,
  Pencil,
  Play,
  Sparkles,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LearnQuest | Playful K-12 Learning" },
      { name: "description", content: "LearnQuest turns K-12 learning into a colorful quest with skill paths, streaks, XP, badges, and family progress." },
      { property: "og:title", content: "LearnQuest | Playful K-12 Learning" },
      { property: "og:description", content: "A colorful K-12 learning quest for curious kids, with clear progress for families and teachers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LearnQuest,
});

type Subject = "Math" | "Science" | "English";

const grades = [
  [1, "Sprout", "🌱"], [2, "Explorer", "🐣"], [3, "Builder", "🧱"],
  [4, "Inventor", "🚀"], [5, "Thinker", "🔭"], [6, "Scientist", "🧪"],
  [7, "Creator", "🎨"], [8, "Problem-solver", "🧩"], [9, "Navigator", "🧭"],
  [10, "Scholar", "📚"], [11, "Mentor", "🌟"], [12, "Champion", "🏆"],
] as const;

const subjectConfig: Record<Subject, { icon: string; kicker: string; nodes: string[]; progress: number; accent: string; iconTone: string; bar: string }> = {
  Math: { icon: "＋", kicker: "Numbers & patterns", nodes: ["Fractions", "Multiplication", "Area & perimeter", "Probability"], progress: 72, accent: "border-quest bg-quest/15 text-quest", iconTone: "bg-quest/15 text-quest", bar: "[&>div]:bg-quest" },
  Science: { icon: "✦", kicker: "Wonder & discovery", nodes: ["Living things", "Matter lab", "Energy", "Our planet"], progress: 54, accent: "border-sky bg-sky/15 text-sky", iconTone: "bg-sky/15 text-sky", bar: "[&>div]:bg-sky" },
  English: { icon: "Aa", kicker: "Words & stories", nodes: ["Story starters", "Grammar garden", "Reading trail", "Big ideas"], progress: 38, accent: "border-coral bg-coral/15 text-coral", iconTone: "bg-coral/15 text-coral", bar: "[&>div]:bg-coral" },
};

const learners = [
  { rank: 1, name: "Aisha K.", grade: "Grade 4", xp: "2,450 XP", initials: "AK", tone: "bg-sun text-sun-foreground" },
  { rank: 2, name: "Milo R.", grade: "Grade 3", xp: "2,180 XP", initials: "MR", tone: "bg-sky text-sky-foreground" },
  { rank: 3, name: "Zoe T.", grade: "Grade 5", xp: "1,995 XP", initials: "ZT", tone: "bg-quest text-quest-foreground" },
  { rank: 4, name: "Dev P.", grade: "Grade 4", xp: "1,760 XP", initials: "DP", tone: "bg-coral text-coral-foreground" },
];

const badges = [
  { icon: "∑", name: "Math Master", note: "All numbers", tone: "bg-quest/15 text-quest" },
  { icon: "♨", name: "Reading Streak", note: "7 days strong", tone: "bg-coral/15 text-coral" },
  { icon: "✦", name: "Curious Mind", note: "10 discoveries", tone: "bg-sky/15 text-sky" },
  { icon: "★", name: "Speed Learner", note: "Keep exploring", tone: "bg-muted text-muted-foreground", locked: true },
  { icon: "◈", name: "Star Collector", note: "Keep exploring", tone: "bg-muted text-muted-foreground", locked: true },
  { icon: "♛", name: "Grade Champion", note: "Keep exploring", tone: "bg-muted text-muted-foreground", locked: true },
];

function LearnQuest() {
  const [selectedGrade, setSelectedGrade] = useState(4);
  const [selectedSubject, setSelectedSubject] = useState<Subject>("Math");
  const subject = subjectConfig[selectedSubject];

  const scrollToPath = () => document.getElementById("quest-path")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="min-h-screen overflow-hidden bg-background font-body text-foreground">
      <nav className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:flex sm:justify-between sm:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="LearnQuest home">
            <span className="grid size-10 shrink-0 rotate-[-7deg] place-items-center rounded-[14px] bg-quest font-display text-xl font-extrabold text-quest-foreground shadow-[0_4px_0_color-mix(in_oklab,var(--quest)_72%,black)]">L</span>
            <span className="truncate font-display text-[23px] font-extrabold tracking-tight">LearnQuest</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-extrabold text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#quest-path">My path</a>
            <a className="transition-colors hover:text-foreground" href="#rewards">Rewards</a>
            <a className="transition-colors hover:text-foreground" href="#progress">Progress</a>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full bg-sun/20 px-3 py-2 text-sm font-extrabold text-sun-foreground sm:flex"><Flame className="size-4" /> 7</div>
            <Button variant="outline" size="sm" className="rounded-full border-border bg-paper font-extrabold">Sign in</Button>
          </div>
        </div>
      </nav>

      <section id="top" className="quest-pattern relative border-b border-border/60 bg-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
          <div className="relative z-10">
            <Badge className="rounded-full border-0 bg-quest/15 px-3 py-1.5 font-extrabold text-quest"><Sparkles className="mr-1.5 size-3.5" /> The fun way to grow</Badge>
            <h1 className="mt-6 max-w-[12ch] font-display text-5xl font-extrabold leading-[.94] tracking-tight sm:text-7xl">Big quests.<br /><span className="text-coral">Bright minds.</span></h1>
            <p className="mt-6 max-w-xl text-lg font-semibold leading-relaxed text-muted-foreground sm:text-xl">Turn every lesson into a little win. Follow your path, collect XP, and discover what you can do next.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button onClick={scrollToPath} size="lg" className="quest-shine h-14 rounded-2xl bg-coral px-7 font-display text-lg font-extrabold text-coral-foreground shadow-[0_5px_0_color-mix(in_oklab,var(--coral)_72%,black)] transition-transform hover:-translate-y-0.5 hover:bg-coral active:translate-y-1">Start learning <ArrowRight className="size-5" /></Button>
              <Button variant="outline" onClick={scrollToPath} size="lg" className="h-14 rounded-2xl border-border bg-background px-6 font-extrabold"><Play className="size-4 fill-current" /> See your path</Button>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm font-extrabold text-muted-foreground"><div className="flex -space-x-2"><span className="grid size-9 place-items-center rounded-full border-2 border-paper bg-sun text-xs text-sun-foreground">AK</span><span className="grid size-9 place-items-center rounded-full border-2 border-paper bg-sky text-xs text-sky-foreground">MR</span><span className="grid size-9 place-items-center rounded-full border-2 border-paper bg-quest text-xs text-quest-foreground">ZT</span></div><span>2,400 curious minds learning today</span></div>
          </div>
          <div className="relative mx-auto min-h-[330px] w-full max-w-[460px] lg:min-h-[430px]">
            <div className="absolute inset-x-8 bottom-2 top-16 rounded-[38%] bg-sky/20 blur-2xl" />
            <div className="quest-bob absolute inset-x-10 bottom-8 top-4 rounded-[44%_44%_37%_37%] bg-quest shadow-[inset_-14px_-18px_0_color-mix(in_oklab,var(--quest)_72%,black),0_18px_0_color-mix(in_oklab,var(--quest)_32%,transparent)]">
              <div className="absolute -left-4 top-4 h-28 w-20 rotate-[-28deg] rounded-[70%_30%_60%_40%] bg-quest shadow-[inset_8px_5px_0_color-mix(in_oklab,var(--quest)_72%,black)]" />
              <div className="absolute -right-4 top-4 h-28 w-20 rotate-[28deg] rounded-[30%_70%_40%_60%] bg-quest shadow-[inset_-8px_5px_0_color-mix(in_oklab,var(--quest)_72%,black)]" />
              <div className="absolute left-[22%] top-[30%] size-10 rounded-full border-4 border-foreground bg-background"><span className="absolute left-2 top-2 size-3 rounded-full bg-foreground" /></div>
              <div className="absolute right-[22%] top-[30%] size-10 rounded-full border-4 border-foreground bg-background"><span className="absolute left-2 top-2 size-3 rounded-full bg-foreground" /></div>
              <div className="absolute bottom-[21%] left-1/2 h-16 w-28 -translate-x-1/2 rounded-[50%] bg-background"><span className="absolute left-1/2 top-3 h-5 w-7 -translate-x-1/2 rounded-full bg-foreground" /><span className="absolute bottom-3 left-1/2 h-5 w-12 -translate-x-1/2 rounded-b-full border-b-4 border-foreground" /></div>
              <span className="absolute bottom-8 left-1/2 grid size-14 -translate-x-1/2 translate-y-full rotate-45 place-items-center rounded-xl bg-sun shadow-[0_0_0_6px_color-mix(in_oklab,var(--paper)_80%,transparent)]"><Star className="size-8 -rotate-45 fill-sun-foreground text-sun-foreground" /></span>
            </div>
            <div className="absolute left-0 top-12 rotate-[-8deg] rounded-2xl border border-border bg-background px-4 py-3 shadow-xl"><p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Today’s win</p><p className="font-display text-xl font-extrabold text-quest">+120 XP</p></div>
            <div className="absolute bottom-3 right-0 rotate-[6deg] rounded-2xl border border-border bg-background px-4 py-3 shadow-xl"><p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current level</p><p className="font-display text-xl font-extrabold">12 · Explorer</p></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="mb-6 flex items-end justify-between gap-4"><div><p className="font-black uppercase tracking-[.18em] text-quest text-xs">Choose a trail</p><h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Where are you today?</h2></div><span className="hidden font-extrabold text-muted-foreground sm:block">12 grades <ChevronRight className="inline size-4" /></span></div>
        <div className="-mx-5 overflow-x-auto px-5 pb-3 sm:mx-0 sm:px-0"><div className="flex w-max gap-3 sm:grid sm:w-auto sm:grid-cols-4 lg:grid-cols-6">
          {grades.map(([grade, name, icon]) => <Button key={grade} variant="outline" onClick={() => { setSelectedGrade(grade); scrollToPath(); }} className={`group h-auto w-[124px] shrink-0 flex-col items-start gap-1 rounded-2xl border-border bg-background p-4 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-quest/60 hover:bg-quest/5 sm:w-auto ${selectedGrade === grade ? "border-quest bg-quest text-quest-foreground shadow-[0_5px_0_color-mix(in_oklab,var(--quest)_72%,black)] hover:bg-quest" : ""}`}><span className="text-2xl" aria-hidden="true">{icon}</span><span className="font-display text-xl font-extrabold">{grade}</span><span className={`text-xs font-extrabold ${selectedGrade === grade ? "text-quest-foreground/80" : "text-muted-foreground"}`}>{name}</span></Button>)}
        </div></div>
      </section>

      <section id="quest-path" className="border-y border-border/70 bg-mint/20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.5fr_1fr] lg:py-20">
          <div className="rounded-[28px] border border-border bg-background p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-5"><div><p className="font-black uppercase tracking-[.18em] text-muted-foreground text-xs">Grade {selectedGrade} · Skill path</p><h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Your next little win</h2><p className="mt-1 font-semibold text-muted-foreground">Choose a subject, then follow the trail.</p></div><div className="flex items-center gap-2 rounded-full bg-sun/20 px-3 py-2 text-sm font-extrabold text-sun-foreground"><Flame className="size-4" /> 7-day streak</div></div>
            <div className="mt-8 flex flex-wrap gap-2">{(Object.keys(subjectConfig) as Subject[]).map((name) => <Button key={name} variant="outline" onClick={() => setSelectedSubject(name)} className={`rounded-full border-border px-4 font-extrabold ${selectedSubject === name ? subjectConfig[name].accent : "bg-background text-muted-foreground"}`}>{subjectConfig[name].icon} {name}</Button>)}</div>
            <div className="relative mt-10 space-y-7 pl-3 before:absolute before:bottom-4 before:left-[31px] before:top-4 before:w-1 before:rounded-full before:bg-border sm:pl-4">
              {subject.nodes.map((node, index) => <div key={node} className="relative flex items-center gap-4"><div className={`relative z-10 grid size-14 shrink-0 place-items-center rounded-full border-4 border-background font-display text-xl font-extrabold shadow-sm ${index < 2 ? "bg-quest text-quest-foreground" : index === 2 ? "bg-sun text-sun-foreground ring-4 ring-sun/25" : "bg-muted text-muted-foreground"}`}>{index < 2 ? <Check className="size-6" /> : index === 2 ? "3" : <LockKeyhole className="size-5" />}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className={`font-display text-lg font-extrabold ${index === 3 ? "text-muted-foreground" : ""}`}>{node}</h3><span className={`text-xs font-black uppercase tracking-wider ${index < 2 ? "text-quest" : index === 2 ? "text-sun-foreground" : "text-muted-foreground"}`}>{index < 2 ? "complete" : index === 2 ? "up next" : "locked"}</span></div><Progress value={index < 2 ? 100 : index === 2 ? 34 : 0} className={`mt-2 h-2.5 ${index === 2 ? "bg-sun/20 [&>div]:bg-sun" : "bg-muted [&>div]:bg-quest"}`} /></div></div>)}
            </div>
            <Button onClick={scrollToPath} className="mt-9 h-12 w-full rounded-xl bg-foreground font-extrabold text-background hover:bg-foreground/90">Continue {subject.nodes[2]} <ArrowRight className="size-4" /></Button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-[28px] bg-foreground p-6 text-background shadow-sm sm:p-8"><div className="flex items-start justify-between"><div><p className="font-black uppercase tracking-[.18em] text-background/60 text-xs">Level 12</p><h2 className="mt-2 font-display text-3xl font-extrabold">Explorer</h2></div><Trophy className="size-9 text-sun" /></div><div className="mt-8 flex justify-between text-sm font-extrabold text-background/75"><span>340 XP</span><span>500 XP to level up</span></div><Progress value={68} className="mt-2 h-3 bg-background/15 [&>div]:bg-sun" /><div className="mt-5 flex items-center gap-2 text-sm font-bold text-background/70"><Sparkles className="size-4 text-sun" /> 160 XP earned this week</div></div>
            <div className="grid grid-cols-2 gap-4"><div className="rounded-2xl border border-border bg-background p-5"><Flame className="size-7 text-coral" /><p className="mt-3 font-display text-3xl font-extrabold">7</p><p className="text-sm font-extrabold text-muted-foreground">day streak</p></div><div className="rounded-2xl border border-border bg-background p-5"><Medal className="size-7 text-sky" /><p className="mt-3 font-display text-3xl font-extrabold">12</p><p className="text-sm font-extrabold text-muted-foreground">badges earned</p></div></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20"><div className="mb-7 flex items-end justify-between gap-4"><div><p className="font-black uppercase tracking-[.18em] text-coral text-xs">Keep going</p><h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Your adventure so far</h2></div><Button variant="ghost" className="hidden font-extrabold text-muted-foreground sm:flex">View all stats <ChevronRight className="size-4" /></Button></div><div className="grid gap-4 md:grid-cols-3">{(Object.entries(subjectConfig) as [Subject, typeof subjectConfig[Subject]][]).map(([name, config]) => <div key={name} className="rounded-2xl border border-border bg-background p-5 shadow-sm"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className={`grid size-10 place-items-center rounded-xl font-display font-extrabold ${config.iconTone}`}>{config.icon}</span><div><h3 className="font-display text-lg font-extrabold">{name}</h3><p className="text-xs font-bold text-muted-foreground">{config.kicker}</p></div></div><span className="font-display text-lg font-extrabold">{config.progress}%</span></div><Progress value={config.progress} className={`mt-5 h-3 bg-muted ${config.bar}`} /><p className="mt-3 text-sm font-bold text-muted-foreground">{Math.round(config.progress / 10)} lessons completed this month</p></div>)}</div></section>

      <section id="rewards" className="border-y border-border/70 bg-paper"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:py-20"><div><p className="font-black uppercase tracking-[.18em] text-sun-foreground text-xs">Collect the good stuff</p><h2 className="mt-2 font-display text-4xl font-extrabold leading-tight tracking-tight">Every win<br />deserves a badge.</h2><p className="mt-4 max-w-sm font-semibold leading-relaxed text-muted-foreground">Small moments add up. Celebrate the skills you’ve practiced and unlock the next one.</p><Button onClick={scrollToPath} className="mt-7 rounded-xl bg-sun font-extrabold text-sun-foreground shadow-[0_4px_0_color-mix(in_oklab,var(--sun)_72%,black)] hover:bg-sun">Earn your next badge <ArrowRight className="size-4" /></Button></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{badges.map((badge) => <div key={badge.name} className={`rounded-2xl border border-border bg-background p-4 text-center shadow-sm transition-transform hover:-translate-y-1 ${badge.locked ? "opacity-65" : ""}`}><div className={`mx-auto grid size-14 place-items-center rounded-2xl font-display text-3xl font-extrabold ${badge.tone}`}>{badge.locked ? <LockKeyhole className="size-5" /> : badge.icon}</div><h3 className="mt-3 font-display text-base font-extrabold">{badge.name}</h3><p className="mt-0.5 text-xs font-bold text-muted-foreground">{badge.note}</p></div>)}</div></div></section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:py-20"><div className="rounded-[28px] border border-border bg-background p-6 shadow-sm sm:p-8"><div className="flex items-center justify-between"><div><p className="font-black uppercase tracking-[.18em] text-coral text-xs">This week</p><h2 className="mt-2 font-display text-3xl font-extrabold">Quest leaderboard</h2></div><Trophy className="size-8 text-sun" /></div><div className="mt-6 space-y-2">{learners.map((learner) => <div key={learner.rank} className={`flex items-center gap-3 rounded-xl p-3 ${learner.rank === 1 ? "bg-sun/15" : "bg-muted/45"}`}><span className={`w-5 text-center font-display text-xl font-extrabold ${learner.rank === 1 ? "text-sun-foreground" : "text-muted-foreground"}`}>{learner.rank}</span><span className={`grid size-10 shrink-0 place-items-center rounded-full text-xs font-black ${learner.tone}`}>{learner.initials}</span><div className="min-w-0 flex-1"><p className="truncate font-display font-extrabold">{learner.name}</p><p className="text-xs font-bold text-muted-foreground">{learner.grade}</p></div><span className="shrink-0 text-sm font-extrabold">{learner.xp}</span></div>)}</div><Button variant="outline" className="mt-5 w-full rounded-xl border-border font-extrabold">See full leaderboard <ArrowRight className="size-4" /></Button></div><div className="rounded-[28px] border border-border bg-background p-6 shadow-sm sm:p-8"><div className="flex items-center justify-between"><div><p className="font-black uppercase tracking-[.18em] text-quest text-xs">My collection</p><h2 className="mt-2 font-display text-3xl font-extrabold">Badge shelf</h2></div><span className="rounded-full bg-quest/15 px-3 py-1.5 text-sm font-extrabold text-quest">3 / 6</span></div><div className="mt-6 grid grid-cols-3 gap-3">{badges.map((badge) => <div key={`${badge.name}-shelf`} className={`grid aspect-square place-items-center rounded-2xl border border-border ${badge.tone} ${badge.locked ? "opacity-45" : ""}`} title={badge.name}>{badge.locked ? <LockKeyhole className="size-5" /> : <span className="font-display text-3xl font-extrabold">{badge.icon}</span>}</div>)}</div><div className="mt-5 flex items-center justify-between text-sm font-bold text-muted-foreground"><span>Math Master</span><span>Reading Streak</span><span>3 more to unlock</span></div></div></section>

      <section id="progress" className="bg-foreground text-background"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20"><div className="flex flex-wrap items-start justify-between gap-6"><div><Badge className="rounded-full border-0 bg-background/10 px-3 py-1.5 font-extrabold text-background"><BarChart3 className="mr-1.5 size-3.5" /> Parent & teacher view</Badge><h2 className="mt-5 max-w-xl font-display text-4xl font-extrabold leading-tight">A calm window into the quest.</h2><p className="mt-4 max-w-lg text-lg font-semibold leading-relaxed text-background/65">See the momentum behind the magic — without getting in the way of the fun.</p></div><Button variant="outline" className="rounded-xl border-background/20 bg-background/10 font-extrabold text-background hover:bg-background/20 hover:text-background">Open progress report <ArrowRight className="size-4" /></Button></div><div className="mt-10 grid gap-5 lg:grid-cols-[1.25fr_.75fr]"><div className="rounded-2xl bg-background/10 p-5 sm:p-7"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-widest text-background/55">Weekly activity</p><p className="mt-1 font-display text-2xl font-extrabold">A steady climb</p></div><span className="flex items-center gap-1.5 text-sm font-extrabold text-sun"><Sparkles className="size-4" /> +18% this week</span></div><div className="mt-8 flex h-36 items-end gap-2 border-b border-background/10 pb-0">{[48, 66, 42, 80, 92, 58, 30].map((height, index) => <div key={index} className={`group relative flex-1 rounded-t-lg ${index === 4 ? "bg-sun" : "bg-sky/65"}`} style={{ height: `${height}%` }}><span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 text-xs font-black text-background/70 group-hover:block">{Math.round(height / 4)}m</span></div>)}</div><div className="mt-3 flex justify-between text-[10px] font-black tracking-widest text-background/45"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div></div><div className="rounded-2xl bg-background p-5 text-foreground sm:p-7"><div className="flex items-center gap-2"><Users className="size-5 text-sky" /><p className="font-display text-xl font-extrabold">At a glance</p></div><div className="mt-6 grid grid-cols-3 gap-3"><div><p className="font-display text-2xl font-extrabold">24h</p><p className="text-xs font-bold text-muted-foreground">time learning</p></div><div><p className="font-display text-2xl font-extrabold">128</p><p className="text-xs font-bold text-muted-foreground">quizzes passed</p></div><div><p className="font-display text-2xl font-extrabold">92%</p><p className="text-xs font-bold text-muted-foreground">accuracy</p></div></div><div className="mt-7 border-t border-border pt-5"><p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Teacher note</p><p className="mt-2 font-semibold leading-relaxed">“Strong week in English. A little more practice with long division will unlock the next trail.”</p><div className="mt-4 flex items-center gap-2 text-sm font-extrabold text-muted-foreground"><span className="grid size-8 place-items-center rounded-full bg-coral/15 text-coral"><Pencil className="size-4" /></span> Ms. Rivera · Today</div></div></div></div></div></section>

      <footer className="border-t border-border bg-paper"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-9 text-center sm:flex-row sm:px-8 sm:text-left"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-quest font-display font-extrabold text-quest-foreground">L</span><span className="font-display text-lg font-extrabold">LearnQuest</span></div><p className="text-sm font-bold text-muted-foreground">Made for curious minds, built for the whole trail.</p><div className="flex items-center gap-4 text-sm font-extrabold text-muted-foreground"><a href="#progress" className="hover:text-foreground">Parents</a><a href="#quest-path" className="hover:text-foreground">Learning path</a><a href="#top" className="hover:text-foreground"><CircleHelp className="size-4" /></a></div></div></footer>
    </main>
  );
}