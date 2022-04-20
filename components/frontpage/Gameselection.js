import { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import Link from "next/link";

export default function Gameselection() {
  const [isOpen, setIsOpen] = useState(false)

  const changeToggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div>
      <hr />
      {/* <h3 className='text-center'>Choose your Game Gender</h3>
      <div className="justify-content-center d-flex">
        <Navbar color="purple" light expand="md">
          <NavbarToggler onClick={changeToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mx-auto" navbar>
              <NavItem>
                <NavLink className="mx-5 px-3 btn btn-outline-light" href="#">Fantasy</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="mx-5 px-3 btn btn-outline-light" href="#">Action</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="mx-5 px-3 btn btn-outline-light" href="#">RGP</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="mx-5 px-3 btn btn-outline-light" href="#">Thriller</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div> */}
      {/* <div className='text-center'>
        <img className="mx-2 my-2" src="https://cdn.pixabay.com/photo/2019/09/23/16/06/war-4499000_960_720.jpg" width={250} height={200} alt='action game' />
        <img className="mx-2 my-2" src="https://i.pinimg.com/564x/09/8e/6b/098e6bbe79d3bac42fdda10d7f18c275.jpg" width={250} height={200} alt='Thriller' />
        <img className="mx-2 my-2" src="https://i.pinimg.com/564x/09/8e/6b/098e6bbe79d3bac42fdda10d7f18c275.jpg" width={250} height={200} alt='Thriller' />
      </div> */}
      <div className='text-center my-3'>
        <Link href={"/games/list"}>
          <Button color="light" outline>
            Game Detail
          </Button>
        </Link>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}