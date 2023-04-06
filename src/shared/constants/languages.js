import CSharpLogo from "../logo/CSharpLogo";
import GoLogo from "../logo/GoLogo";
import PythonLogo from "../logo/PythonLogo";
import CLogo from "../logo/CLogo";
import CppLogo from "../logo/CppLogo";
import JavaScript from "../logo/JavaScriptLogo";
import KotlinLogo from "../logo/KotlinLogo";
import TypeScript from "../logo/TypeScriptLogo";
import RubyLogo from "../logo/RubyLogo";

const languages = [
  {
    name: "csharp",
    ext: "C#",
    value: 1,
    logo: <CSharpLogo />,
  },
  {
    name: "go",
    ext: "go",
    value: 20,
    logo: <GoLogo />,
  },
  {
    name: "python",
    ext: "python",
    value: 5,
    logo: <PythonLogo />,
  },
  {
    name: "c",
    ext: "c",
    value: 6,
    logo: <CLogo />,
  },
  {
    name: "cpp",
    ext: "cpp",
    value: 7,
    logo: <CppLogo />,
  },
  {
    name: "javascript",
    ext: "javascript",
    value: 17,
    logo: <JavaScript />,
  },
  {
    name: "kotlin",
    ext: "kotlin",
    value: 43,
    logo: <KotlinLogo />,
  },
  {
    name: "typescript",
    ext: "typescript",
    value: 60,
    logo: <TypeScript />,
  },
  {
    name: "ruby",
    ext: "ruby",
    value: 12,
    logo: <RubyLogo />,
  },
];

export default languages;