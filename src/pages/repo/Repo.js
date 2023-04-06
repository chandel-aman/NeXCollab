
import classes from "./repo.module.css";

const DUMMY_PRJ = [
    {prjName: "Lost-and-Found-Pet",
    description: "website for pets fjasl aldsjd ij lsdf oasal oafjdslf jfoi dfjosiwe fijaosdfjlwej oasidfja iaj",
    numOfCollaborators: 4,
    tech: ['ReactJs', 'NodeJs', 'CSS'],
    folder: [
        {name: 'Client', type: "folder"},
        {name: 'Server', type: "folder"},
        {name: 'package', type: "json"},
        {name: 'README', type: "md"},
        {name: 'fads', type: "js"},
        {name: 'fsd', type: "js"},
    ],

}
];

const Repo = () => {
    return (<div>
        <h2>{DUMMY_PRJ.prjName}</h2>
        <div className={classes.prjNav}>
            <span>Code</span>
            <span>History</span>
            <span>New</span>
        </div>
        <div className={classes.fileStructure}>

        </div>
    </div>);
};

export default Repo;