import Link from "next/link";
import { Button } from 'reactstrap'

export default function Content() {
  return (
    <div>
      <h1 className="display-4">Online Gaming Platform</h1>
      <p className="lead">This is a game platform that you can play online using your computer device, explore some of the games we have provided here and make the highest score.</p>
      <hr className="my-2" />
      <p className="lead">
        <Link href="/"><Button color="primary">Learn More</Button></Link>
      </p>
    </div>
  );
}